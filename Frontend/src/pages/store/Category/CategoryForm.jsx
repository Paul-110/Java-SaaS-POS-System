import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategory } from '@/Redux Toolkit/features/category/categoryThunks';
import { useToast } from '@/components/ui/use-toast';

const validationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
  description: Yup.string().optional(),
});

const CategoryForm = ({ initialValues, onSubmit, onCancel, isEditing = false }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { loading } = useSelector((state) => state.category);
  const { store } = useSelector((state) => state.store);

  const defaultValues = {
    name: '',
    description: '',
    ...initialValues
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = localStorage.getItem('jwt');
      const dto = {
        ...values,
        storeId: store.id,
      };

      if (isEditing && initialValues?.id) {
        await dispatch(updateCategory({ id: initialValues.id, dto, token })).unwrap();
        toast({ title: 'Success', description: 'Category updated successfully' });
      } else {
        await dispatch(createCategory({ dto, token })).unwrap();
        toast({ title: 'Success', description: 'Category added successfully' });
        resetForm();
      }

      if (onSubmit) onSubmit();
    } catch (err) {
      toast({ 
        title: 'Error', 
        description: err || `Failed to ${isEditing ? 'update' : 'add'} category`, 
        variant: 'destructive' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="space-y-4 py-2 pr-2">
          <div className="space-y-2"> 
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Category Name</label>
            <Field
              as={Input}
              id="name"
              name="name"
              placeholder="Enter category name"
              className={`w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 ${touched.name && errors.name ? "border-red-500" : "border-white/20 hover:border-white/40"}`}
            />
            <ErrorMessage name="name" component="div" className="text-red-400 text-sm" />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <Field
              as={Textarea}
              id="description"
              name="description"
              className="w-full pl-4 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40 resize-none"
              placeholder="Enter category description"
              rows={3}
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit"
              className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditing ? 'Updating...' : 'Adding...'}
                </span>
              ) : (
                isEditing ? 'Update Category' : 'Add Category'
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;