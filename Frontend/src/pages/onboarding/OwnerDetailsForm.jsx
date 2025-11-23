import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const OwnerDetailsForm = ({ initialValues, onSubmit, onBack, mousePosition }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [visibleFields, setVisibleFields] = useState([]);

  useEffect(() => {
    const fields = ['fullName', 'email', 'password', 'confirmPassword', 'submit'];
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
          <div className={`transition-all duration-500 ease-out ${visibleFields.includes('fullName') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 1}px) translateY(${mousePosition.y * 1}px)` }}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Field
                  as={Input}
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 ${
                    touched.fullName && errors.fullName 
                      ? 'border-red-500' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-2 flex items-center">
                  {msg => (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-out ${visibleFields.includes('email') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -1.5}px) translateY(${mousePosition.y * -1.5}px)` }}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Field
                  as={Input}
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 ${
                    touched.email && errors.email 
                      ? 'border-red-500' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-2 flex items-center">
                  {msg => (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-out ${visibleFields.includes('password') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)` }}>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Field
                  as={Input}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 ${
                    touched.password && errors.password 
                      ? 'border-red-500' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-2 flex items-center">
                  {msg => (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-out ${visibleFields.includes('confirmPassword') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -1}px) translateY(${mousePosition.y * -1}px)` }}>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Field
                  as={Input}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10 text-white placeholder-gray-400 ${
                    touched.confirmPassword && errors.confirmPassword 
                      ? 'border-red-500' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-2 flex items-center">
                  {msg => (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                      {msg}
                    </>
                  )}
                </ErrorMessage>
              </div>
            </div>
          </div>

          <div className={`pt-4 transition-all duration-500 ease-out ${visibleFields.includes('submit') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 1.5}px) translateY(${mousePosition.y * 1.5}px)` }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full group flex items-center justify-center py-3 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Processing...
                </>
              ) : (
                <>
                  Next Step
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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

export default OwnerDetailsForm; 