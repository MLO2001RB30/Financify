import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, mode = 'login', onAuth }) => {
  const [formMode, setFormMode] = useState(mode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    fullName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formMode === 'signup') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.companyName) {
        newErrors.companyName = 'Company name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, always succeed
    onAuth({
      email: formData.email,
      fullName: formData.fullName || 'Demo User',
      companyName: formData.companyName || 'Demo Company'
    });
    
    setIsLoading(false);
    onClose();
  };

  const switchMode = () => {
    setFormMode(formMode === 'login' ? 'signup' : 'login');
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      fullName: ''
    });
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <h2>{formMode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
          <p>
            {formMode === 'login' 
              ? 'Sign in to continue to Financify' 
              : 'Start your financial planning journey'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {formMode === 'signup' && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={errors.companyName ? 'error' : ''}
                  placeholder="Enter your company name"
                />
                {errors.companyName && <span className="error-text">{errors.companyName}</span>}
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {formMode === 'signup' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-auth-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              formMode === 'login' ? 'Sign in' : 'Create account'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="btn-auth-google">
          <span className="google-icon">🚀</span>
          Continue with Google
        </button>

        <div className="auth-switch">
          <p>
            {formMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={switchMode} className="link-button">
              {formMode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 