import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import OwnerDetailsForm from './OwnerDetailsForm';
import StoreDetailsForm from './StoreDetailsForm';
import { signup } from '../../Redux Toolkit/features/auth/authThunk';
import { createStore, getStoreByAdmin } from '../../Redux Toolkit/features/store/storeThunks';
import { getUserProfile } from '../../Redux Toolkit/features/user/userThunks';
import { useNavigate } from 'react-router';
import { ShoppingCart } from 'lucide-react';

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isCompleted } = useSelector((state) => state.onboarding);
  
  const [step, setStep] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);
  const [formData, setFormData] = useState({
    // Owner Details

    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Store Details
    storeName: '',
    storeType: '',
    storeAddress: '',
  });
  const [localError, setLocalError] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // On mount: check JWT, fetch profile, and store
  useEffect(() => {
    const checkOnboarding = async () => {
      const jwt = localStorage.getItem('jwt');
      
      if (jwt) {
        setLocalLoading(true);
        try {
          const userRes = await dispatch(getUserProfile(jwt)).unwrap();
          if (userRes && userRes.role === 'ROLE_STORE_ADMIN') {
            try {
              const storeRes = await dispatch(getStoreByAdmin(jwt)).unwrap();
              if (storeRes && storeRes.id) {
                // Store exists, redirect to dashboard or show message
                navigate('/');
                
                return;
              } else {
                // No store, skip to store details
                setStep(2);
              }
            } catch (err) {
              // No store found, skip to store details
              setStep(2);
            }
          } else {
            // Not an admin, or other role, start from step 1
            setStep(1);
          }
        } catch (err) {
          // Invalid jwt or error, clear jwt and stay on step 1
          localStorage.removeItem('jwt');
        }
        setLocalLoading(false);
      } else {
        // No JWT, start from step 1
        setStep(1);
        setLocalLoading(false);
      }
    };
    checkOnboarding();
    // eslint-disable-next-line
  }, [dispatch]);

  // Handle mouse move for parallax effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      // Normalize position from -1 to 1
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStepSubmit = async (stepData) => {
    setLocalError(null);
    const updatedFormData = { ...formData, ...stepData };
    setFormData(updatedFormData);
    if (step === 1) {
      // Signup step
      setLocalLoading(true);
      try {
        const signupRes = await dispatch(signup({
          fullName: updatedFormData.fullName,
          email: updatedFormData.email,
          password: updatedFormData.password,
          role: 'ROLE_STORE_ADMIN',
        })).unwrap();
        if (signupRes && signupRes.jwt) {
          localStorage.setItem('jwt', signupRes.jwt);
        }
        setFadeIn(false);
        setTimeout(() => {
          setStep(2);
          setFadeIn(true);
        }, 150);
      } catch (err) {
        setLocalError(err || 'Signup failed');
      }
      setLocalLoading(false);
    } else if (step === 2) {
      // Store creation step
      setLocalLoading(true);
      try {
        await dispatch(createStore({
            brand: updatedFormData.storeName,
            storeType: updatedFormData.storeType,
            storeAddress: updatedFormData.storeAddress,
          
        })).unwrap();
        // On success, redirect or show success
        navigate('/');
      } catch (err) {
        setLocalError(err || 'Store creation failed');
      }
      setLocalLoading(false);
    }
  };

  const handleStepBack = () => {
    if (step > 1) {
      // Fade out current step
      setFadeIn(false);
      setTimeout(() => {
        setStep(step - 1);
        setFadeIn(true);
      }, 150);
    }
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OwnerDetailsForm
            initialValues={{
              fullName: formData.fullName,
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            }}
            onSubmit={handleStepSubmit}
            onBack={handleStepBack}
            mousePosition={mousePosition}
          />
        );
      case 2:
        return (
          <StoreDetailsForm
            initialValues={{
              storeName: formData.storeName,
              storeType: formData.storeType,
              storeAddress: formData.storeAddress,
            }}
            onSubmit={handleStepSubmit}
            onBack={handleStepBack}
            mousePosition={mousePosition}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Website Logo */}
      <div className="absolute top-0 left-0 z-20 p-6">
        <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 transform">
            <ShoppingCart className="w-6 h-6 font-bold text-muted-foreground group-hover:text-emerald-600 transition-colors" />
          </div>
          <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">POS Pro</span>
        </div>
      </div>

      {/* Animated background from landing.jsx */}
      <div className="absolute inset-0 z-0 opacity-60" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px)` }}>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/70 rounded-full filter blur-3xl animate-blob"></div>
        </div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)` }}>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500/70 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -25}px)` }}>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500/70 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)` }}>
          <div className="absolute -bottom-24 right-20 w-96 h-96 bg-teal-500/60 rounded-full filter blur-3xl animate-blob animation-delay-3000"></div>
        </div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -5}px) translateY(${mousePosition.y * -5}px)` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/50 rounded-full filter blur-3xl animate-blob animation-delay-5000"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-5000 { animation-delay: 5s; }
      `}</style>

      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Side - Branding Section */}
        <div className="relative flex-1 hidden lg:flex items-center justify-center text-white overflow-hidden z-10">
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-white px-12">
            <div className="text-center max-w-md">
              {/* Icon */}
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/30 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl font-extrabold mb-4 leading-tight tracking-tight">
                Set Up Your Digital Storefront
                <span className="block text-green-300 mt-2">in Minutes</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg text-green-100/90 mb-8 leading-relaxed">
                Our guided setup makes it easy to configure your business and start selling.
              </p>
              
              {/* Features List */}
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-green-100/90">Create your admin profile</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-green-100/90">Define your store details</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-green-100/90">Go live instantly</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section - with liquid glass theme */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md relative z-10">
            {/* Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Step {step} of 2
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full font-medium">
                  {step === 1 ? 'Owner Details' : 'Store Details'}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(step / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Error Display */}
            {(error || localError) && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-400/50 text-red-300 rounded-lg shadow-md backdrop-blur-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="font-medium">{error || localError}</span>
                </div>
              </div>
            )}

            {/* Loading Overlay */}
            {localLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-2xl z-50">
                <svg className="animate-spin h-10 w-10 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}

            {/* Form Card with glass effect */}
            <Card className="w-full shadow-2xl border border-white/10 bg-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/15 transition-colors duration-300">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold text-white-900 dark:text-white">
                  {step === 1 ? 'Create Your Account' : 'Store Information'}
                </CardTitle>
                <p className="text-gray-300 mt-2">
                  {step === 1 
                    ? 'Let\'s start by setting up your account details' 
                    : 'Tell us about your business'
                  }
                </p>
              </CardHeader>
              <CardContent className="px-6 sm:px-8 pb-6">
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  {renderStep()}
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <a href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
