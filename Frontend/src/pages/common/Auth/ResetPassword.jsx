import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { 
  Eye, 
  EyeOff, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  ShoppingCart,
  Loader2
} from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '@/Redux Toolkit/features/auth/authThunk'
import { clearResetPasswordState } from '../../../Redux Toolkit/features/auth/authSlice'

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [searchParams] = useSearchParams()
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { resetPasswordLoading, resetPasswordSuccess, resetPasswordError } = useSelector((state) => state.auth)

  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      toast({
        title: "Invalid Link",
        description: "No reset token found in the URL",
        variant: "destructive",
      })
      navigate('/auth/login')
    }
  }, [token, navigate, toast])

  useEffect(() => {
    if (resetPasswordSuccess) {
      setIsSuccess(true)
      toast({
        title: "Success",
        description: "Password reset successful! You can now login with your new password.",
      })
    }
  }, [resetPasswordSuccess, toast])

  useEffect(() => {
    if (resetPasswordError) {
      toast({
        title: "Error",
        description: resetPasswordError,
        variant: "destructive",
      })
    }
  }, [resetPasswordError, toast])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 7) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getPasswordStrength();
  const strengthColors = ['bg-destructive', 'bg-destructive', 'bg-yellow-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (!token) {
      toast({
        title: "Error",
        description: "Invalid reset token",
        variant: "destructive",
      })
      return
    }

    try {
      await dispatch(resetPassword({ token, password: formData.password }))
    } catch (error) {
      console.error('Reset password error:', error)
    }
  }

  const handleBackToLogin = () => {
    dispatch(clearResetPasswordState())
    navigate('/auth/login')
  }

  if (!token) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="grid grid-cols-20 h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border-r border-t border-primary/5"></div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8 relative z-20"> {/* Added relative z-20 */}
          <Link to="/" className="group inline-block">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {isSuccess ? 'Password Reset Complete' : 'Reset Your Password'}
            </h1>
          </Link>
          <p className="text-muted-foreground mt-2">
            {isSuccess 
              ? 'Your password has been successfully reset'
              : 'Enter your new password below'
            }
          </p>
        </div>

        {isSuccess ? (
          <div className="glass-panel p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Password Reset Complete
            </h3>
            <p className="text-muted-foreground mb-6">
              Your password has been successfully updated. You can now login with your new password.
            </p>
            <Button
              onClick={handleBackToLogin}
              className="w-full"
            >
              Back to Login
            </Button>
          </div>
        ) : (
          <div className="glass-panel p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pr-12 bg-background/50 ${errors.password ? 'border-destructive' : 'border-input'}`}
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
                
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-medium text-muted-foreground">Password Strength</p>
                      <p className={`text-xs font-bold ${strength > 2 ? (strength > 3 ? 'text-green-500' : 'text-yellow-500') : 'text-destructive'}`}>{strengthLabels[strength]}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full ${i < strength ? strengthColors[strength] : 'bg-muted'}`}></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pr-12 bg-background/50 ${errors.confirmPassword ? 'border-destructive' : 'border-input'}`}
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full py-3 text-lg font-medium"
                  disabled={resetPasswordLoading}
                >
                  {resetPasswordLoading ? (
                    <div className="flex items-center justify-center ">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin " />
                      Resetting...
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/auth/login" 
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
