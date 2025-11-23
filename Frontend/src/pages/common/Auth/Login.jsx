import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { 
  Eye, 
  EyeOff, 
  CheckCircle,
  ShoppingCart,
  Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login, forgotPassword } from '@/Redux Toolkit/features/auth/authThunk';
import { getUserProfile } from '@/Redux Toolkit/features/user/userThunks';
import { startShift, getCurrentShiftProgress } from '@/Redux Toolkit/features/shiftReport/shiftReportThunks';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [forgotEmail, setForgotEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login(formData));
      if (login.fulfilled.match(resultAction)) {
        toast({
          title: "Success",
          description: "Login successful!",
        });

        const user = resultAction.payload.user;
        dispatch(getUserProfile(resultAction.payload.jwt)); 
        
        const userRole = user.role;
        if (userRole === 'ROLE_ADMIN') {
          navigate('/super-admin');
        } else if (userRole === 'ROLE_BRANCH_CASHIER') {
          try {
            // First, try to get the current shift progress
            await dispatch(getCurrentShiftProgress()).unwrap();
          } catch (shiftError) {
            // If getting current shift fails (e.g., 404 Not Found), it means no shift is active.
            // So, we start a new one.
            console.log("No active shift found, starting a new one.");
            await dispatch(startShift({ branchId: user.branchId, cashierId: user.id })).unwrap();
          }
          navigate('/cashier');
        } else if (userRole === 'ROLE_STORE_ADMIN' || userRole === 'ROLE_STORE_MANAGER') {
          navigate('/store');
        } else if (userRole === 'ROLE_BRANCH_MANAGER' || userRole === 'ROLE_BRANCH_ADMIN') {
          navigate('/branch');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: "Error",
          description: resultAction.payload || 'Login failed',
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Login failed',
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(forgotPassword(forgotEmail));
      if (forgotPassword.fulfilled.match(resultAction)) {
        toast({
          title: "Success",
          description: "Password reset email sent!",
        });
        setEmailSent(true);
      } else {
        toast({
          title: "Error",
          description: resultAction.payload || 'Failed to send reset email',
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Failed to send reset email',
        variant: "destructive",
      });
    }
  };

  const resetForgotPassword = () => {
    setShowForgotPassword(false);
    setEmailSent(false);
    setForgotEmail('');
  };

  const renderContent = () => {
    if (showForgotPassword) {
      if (emailSent) {
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Check Your Email
            </h3>
            <p className="text-gray-400 mb-6">
              We've sent password reset instructions to <strong>{forgotEmail}</strong>
            </p>
            <div className="space-y-3">
              <Button onClick={resetForgotPassword} className="w-full bg-emerald-600 hover:bg-emerald-500">
                Back to Login
              </Button>
              <p className="text-sm text-gray-400">
                Didn't receive it? Check spam or{' '}
                <button
                  onClick={() => setEmailSent(false)}
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        );
      }
      return (
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              id="forgot-email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder-gray-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex space-x-3">
            <Button type="button" variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10" onClick={resetForgotPassword}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Send Reset Link'}
            </Button>
          </div>
        </form>
      );
    }
    return (
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-white/5 border-white/20 text-white placeholder-gray-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="pr-12 bg-white/5 border-white/20 text-white placeholder-gray-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-600" />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>
          <button type="button" onClick={() => setShowForgotPassword(true)} className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">
            Forgot password?
          </button>
        </div>
        <Button type="submit" className="w-full py-3 text-lg font-medium bg-emerald-600 hover:bg-emerald-500" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign In'}
        </Button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-60" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px)` }}><div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/70 rounded-full filter blur-3xl animate-blob"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)` }}><div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500/70 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -25}px)` }}><div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500/70 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)` }}><div className="absolute -bottom-24 right-20 w-96 h-96 bg-teal-500/60 rounded-full filter blur-3xl animate-blob animation-delay-3000"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -5}px) translateY(${mousePosition.y * -5}px)` }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/50 rounded-full filter blur-3xl animate-blob animation-delay-5000"></div></div>
      </div>
      <style>{`@keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } } .animate-blob { animation: blob 7s infinite; } .animation-delay-2000 { animation-delay: 2s; } .animation-delay-3000 { animation-delay: 3s; } .animation-delay-4000 { animation-delay: 4s; } .animation-delay-5000 { animation-delay: 5s; }`}</style>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link to="/" className="group inline-block">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              {showForgotPassword ? 'Reset Password' : 'Welcome Back'}
            </h1>
          </Link>
          <p className="text-gray-400 mt-2">
            {showForgotPassword 
              ? (emailSent ? 'A reset link has been sent' : 'Enter your email to receive reset instructions')
              : 'Sign in to your account to continue'
            }
          </p>
        </div>

        <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          {renderContent()}

          {!showForgotPassword && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-800/50 px-2 text-gray-400 backdrop-blur-sm">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.3 512 0 400.7 0 264.1 0 127.6 111.3 16 244 16c73.1 0 136.3 32.5 181.9 84.4l-67.9 67.9C289.5 139.6 268.3 128 244 128c-70.7 0-128 57.3-128 128s57.3 128 128 128c80.5 0 113.8-61.5 118.3-89.4H244v-71.4h238.9c1.3 12.2 2.1 24.8 2.1 37.8z"></path></svg>
                  Google
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
                  Facebook
                </Button>
              </div>
            </>
          )}
        </div>

        {!showForgotPassword && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/auth/onboarding" className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
