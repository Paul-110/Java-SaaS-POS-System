import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Store, MapPin, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "../../components/ui/select";

const validationSchema = Yup.object({
  storeName: Yup.string()
    .required("Store name is required")
    .min(2, "Store name must be at least 2 characters"),
  storeType: Yup.string().required("Store type is required"),
  storeAddress: Yup.string().optional(),
});

const storeTypes = [
  { value: "retail", label: "Retail Store" },
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Café" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "grocery", label: "Grocery Store" },
  { value: "electronics", label: "Electronics Store" },
  { value: "clothing", label: "Clothing Store" },
  { value: "other", label: "Other" },
];

const StoreDetailsForm = ({ initialValues, onSubmit, onBack, mousePosition }) => {
  const [visibleFields, setVisibleFields] = useState([]);

  useEffect(() => {
    const fields = ['storeName', 'storeType', 'storeAddress', 'navigation'];
    const timeouts = fields.map((field, index) => 
      setTimeout(() => {
        setVisibleFields(prev => [...prev, field]);
      }, index * 100)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, touched, errors }) => (
        <Form className="space-y-6">
          <div className={`transition-all duration-500 ease-out ${visibleFields.includes('storeName') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 1}px) translateY(${mousePosition.y * 1}px)` }}>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Field
                  as={Input}
                  type="text"
                  id="storeName"
                  name="storeName"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 ${
                    touched.storeName && errors.storeName
                      ? 'border-red-500' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  placeholder="Enter your store name"
                  autoComplete="organization"
                />
                <ErrorMessage name="storeName" component="div" className="text-red-500 text-sm mt-2 flex items-center">
                  {(msg) => (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-out ${visibleFields.includes('storeType') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -1.5}px) translateY(${mousePosition.y * -1.5}px)` }}>
              <div>
                <Field name="storeType">
                  {({ form: { setFieldValue, values } }) => (
                    <Select
                      value={values.storeType}
                      onValueChange={(value) => setFieldValue("storeType", value)}
                    >
                      <SelectTrigger className={`w-full text-left border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40 ${!values.storeType && "text-gray-400"}`} id="storeType">
                        <SelectValue placeholder="Select store type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800/80 border-white/20 text-white backdrop-blur-lg">

                        <SelectGroup>
                          <SelectLabel className="text-gray-300">Store Types</SelectLabel>
                          {storeTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="focus:bg-emerald-700/50">
                            {type.label}
                          </SelectItem>
                        ))}
                        </SelectGroup>
                        

                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage name="storeType" component="div" className="text-red-500 text-sm mt-2 flex items-center">
                  {(msg) => (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-out ${visibleFields.includes('storeAddress') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)` }}>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <Field
                  as={Textarea}
                  id="storeAddress"
                  name="storeAddress"
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 border-white/20 hover:border-white/40 resize-none"
                  placeholder="Enter store address (optional)"
                  autoComplete="street-address"
                />
                <ErrorMessage name="storeAddress" component="div" className="text-red-500 text-sm mt-2 flex items-center">
                  {(msg) => (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-out ${visibleFields.includes('navigation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -1}px) translateY(${mousePosition.y * -1}px)` }}>
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full sm:w-auto flex-1 group flex items-center justify-center py-3 text-base font-semibold border-2 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/40 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex-1 group flex items-center justify-center py-3 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete Setup
                </>
              )}
            </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StoreDetailsForm;
