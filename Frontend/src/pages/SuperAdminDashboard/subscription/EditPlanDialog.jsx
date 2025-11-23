import React, { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue
} from '../../../components/ui/select';
import { Switch } from '../../../components/ui/switch';
import { Button } from '../../../components/ui/button';
import { updateSubscriptionPlan } from '@/Redux Toolkit/features/subscriptionPlan/subscriptionPlanThunks';
import { Loader2, Trash2 } from 'lucide-react';

const BILLING_CYCLES = [
  { label: 'Monthly', value: 'MONTHLY' },
  { label: 'Yearly', value: 'YEARLY' },
];

const FEATURE_FIELDS = [
  { key: 'enableAdvancedReports', label: 'Advanced Reports' },
  { key: 'enableInventory', label: 'Inventory System' },
  { key: 'enableIntegrations', label: 'Integrations' },
  { key: 'enableEcommerce', label: 'eCommerce' },
  { key: 'enableInvoiceBranding', label: 'Invoice Branding' },
  { key: 'prioritySupport', label: 'Priority Support' },
  { key: 'enableMultiLocation', label: 'Multi-location' },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().typeError('Price must be a number').required('Price is required').min(0),
  billingCycle: Yup.string().oneOf(['MONTHLY', 'YEARLY']).required('Billing cycle is required'),
  maxBranches: Yup.number().typeError('Branches must be a number').required('Branches is required').min(1),
  maxUsers: Yup.number().typeError('Users must be a number').required('Users is required').min(1),
  maxProducts: Yup.number().typeError('Products must be a number').required('Products is required').min(1),
  enableAdvancedReports: Yup.boolean().required(),
  enableInventory: Yup.boolean().required(),
  enableIntegrations: Yup.boolean().required(),
  enableEcommerce: Yup.boolean().required(),
  enableInvoiceBranding: Yup.boolean().required(),
  prioritySupport: Yup.boolean().required(),
  enableMultiLocation: Yup.boolean().required(),
  extraFeatures: Yup.array().of(Yup.string().required('Feature cannot be empty')).min(1, 'At least one extra feature is required'),
});

const FeaturesSwitchGrid = memo(({ handleFeatureSwitch }) => (
  <div className="grid grid-cols-2 gap-4 p-4 bg-black/20 rounded-md">
    {FEATURE_FIELDS.map(f => (
      <label key={f.key} className="flex items-center gap-3 text-sm font-medium">
        <Field name={f.key} type="checkbox">
          {({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={val => handleFeatureSwitch(f.key, val)}
              id={`edit-${f.key}`}
            />
          )}
        </Field>
        <span className="text-gray-300">{f.label}</span>
      </label>
    ))}
  </div>
));
FeaturesSwitchGrid.displayName = 'FeaturesSwitchGrid';

const ExtraFeaturesList = memo(({ values, handleExtraFeatureChange, handleRemoveExtraFeature, handleAddExtraFeature }) => (
  <>
    {values.extraFeatures.map((feature, idx) => (
      <div key={idx} className="flex gap-2 mb-2">
        <Input
          value={feature}
          onChange={e => handleExtraFeatureChange(idx, e.target.value)}
          placeholder="e.g., Custom API endpoint"
          aria-label={`Extra feature ${idx + 1}`}
          className="bg-white/5 border-white/20 text-white placeholder-gray-500"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleRemoveExtraFeature(idx)}
          disabled={values.extraFeatures.length === 1}
          className="text-red-500 hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ))}
    <Button
      type="button"
      variant="outline"
      onClick={handleAddExtraFeature}
      className="border-white/20 text-white hover:bg-white/10"
    >
      + Add Feature
    </Button>
  </>
));
ExtraFeaturesList.displayName = 'ExtraFeaturesList';

const getInitialValues = (plan) => {
  if (!plan) return null;
  return {
    name: plan.name || '',
    description: plan.description || '',
    price: plan.price || '',
    billingCycle: plan.billingCycle || '',
    maxBranches: plan.maxBranches || '',
    maxUsers: plan.maxUsers || '',
    maxProducts: plan.maxProducts || '',
    enableAdvancedReports: plan.enableAdvancedReports ?? false,
    enableInventory: plan.enableInventory ?? false,
    enableIntegrations: plan.enableIntegrations ?? false,
    enableEcommerce: plan.enableEcommerce ?? false,
    enableInvoiceBranding: plan.enableInvoiceBranding ?? false,
    prioritySupport: plan.prioritySupport ?? false,
    enableMultiLocation: plan.enableMultiLocation ?? false,
    extraFeatures: plan.extraFeatures && plan.extraFeatures.length > 0 ? plan.extraFeatures : [''],
  };
};

const EditPlanDialog = ({ open, onOpenChange, plan, onSuccess }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  if (!plan) return null;

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
      const res = await dispatch(updateSubscriptionPlan({ id: plan.id, plan: values }));
      if (res.meta.requestStatus === 'fulfilled') {
        if (onSuccess) onSuccess();
      } else {
        setErrors({ submit: res.payload || 'Failed to update plan' });
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const renderForm = ({ values, isSubmitting, errors, setFieldValue }) => {
    const handleFeatureSwitch = (key, val) => {
      setFieldValue(key, val);
    };
    const handleExtraFeatureChange = (idx, value) => {
      const arr = [...values.extraFeatures];
      arr[idx] = value;
      setFieldValue('extraFeatures', arr);
    };
    const handleRemoveExtraFeature = idx => {
      const arr = values.extraFeatures.filter((_, i) => i !== idx);
      setFieldValue('extraFeatures', arr.length ? arr : ['']);
    };
    const handleAddExtraFeature = () => {
      setFieldValue('extraFeatures', [...values.extraFeatures, '']);
    };
    return (
      <Form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="edit-plan-name">Plan Name</label>
          <Field as={Input} id="edit-plan-name" name="name" placeholder="e.g., Professional Plan" className="bg-white/5 border-white/20 text-white placeholder-gray-500" />
          <ErrorMessage name="name" component="div" className="text-destructive text-xs mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="edit-plan-description">Description</label>
          <Field as={Input} id="edit-plan-description" name="description" placeholder="A short description of the plan" className="bg-white/5 border-white/20 text-white placeholder-gray-500" />
          <ErrorMessage name="description" component="div" className="text-destructive text-xs mt-1" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="edit-plan-price">Price (₹)</label>
            <Field as={Input} id="edit-plan-price" name="price" type="number" min="0" placeholder="e.g., 1999" className="bg-white/5 border-white/20 text-white placeholder-gray-500" />
            <ErrorMessage name="price" component="div" className="text-destructive text-xs mt-1" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="edit-plan-billing-cycle">Billing Cycle</label>
            <Field name="billingCycle">
              {({ field }) => (
                <Select value={field.value} onValueChange={val => setFieldValue('billingCycle', val)}>
                  <SelectTrigger className="w-full bg-white/5 border-white/20 text-white" id="edit-plan-billing-cycle">
                    <SelectValue placeholder="Select cycle" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800/80 border-white/10 text-white backdrop-blur-lg">
                    {BILLING_CYCLES.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage name="billingCycle" component="div" className="text-destructive text-xs mt-1" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="edit-plan-branches">Max Branches</label>
            <Field as={Input} id="edit-plan-branches" name="maxBranches" type="number" min="1" placeholder="e.g., 5" className="bg-white/5 border-white/20 text-white placeholder-gray-500" />
            <ErrorMessage name="maxBranches" component="div" className="text-destructive text-xs mt-1" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="edit-plan-users">Max Users</label>
            <Field as={Input} id="edit-plan-users" name="maxUsers" type="number" min="1" placeholder="e.g., 20" className="bg-white/5 border-white/20 text-white placeholder-gray-500" />
            <ErrorMessage name="maxUsers" component="div" className="text-destructive text-xs mt-1" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="edit-plan-products">Max Products</label>
            <Field as={Input} id="edit-plan-products" name="maxProducts" type="number" min="1" placeholder="e.g., 10000" className="bg-white/5 border-white/20 text-white placeholder-gray-500" />
            <ErrorMessage name="maxProducts" component="div" className="text-destructive text-xs mt-1" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Included Features</label>
          <FeaturesSwitchGrid handleFeatureSwitch={handleFeatureSwitch} />
          {FEATURE_FIELDS.map(f => (
            <ErrorMessage key={f.key} name={f.key} component="div" className="text-destructive text-xs" />
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Custom Features</label>
          <ExtraFeaturesList
            values={values}
            handleExtraFeatureChange={handleExtraFeatureChange}
            handleRemoveExtraFeature={handleRemoveExtraFeature}
            handleAddExtraFeature={handleAddExtraFeature}
          />
          <ErrorMessage name="extraFeatures" component="div" className="text-destructive text-xs mt-1" />
        </div>
        {errors.submit && <div className="text-destructive text-sm">{errors.submit}</div>}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="border-white/20 text-white hover:bg-white/10">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting || loading} className="w-32 bg-emerald-600 hover:bg-emerald-500">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
          </Button>
        </DialogFooter>
      </Form>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800/80 border-white/10 text-white backdrop-blur-lg sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
          <DialogDescription className="text-gray-400">Update the details for the "{plan.name}" plan.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[65vh] overflow-y-auto pr-4">
          <Formik
            initialValues={getInitialValues(plan)}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {renderForm}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlanDialog;
