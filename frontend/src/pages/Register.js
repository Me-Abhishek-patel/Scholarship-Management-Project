import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Phone, GraduationCap } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    university: '',
    major: '',
    gpa: '',
    graduationYear: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card">
          <div className="text-center mb-4">
            <UserPlus size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
            <h1 style={{ marginBottom: '0.5rem', color: '#374151' }}>Create Account</h1>
            <p className="text-muted">Join thousands of students finding scholarships</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">
                  <User size={16} style={{ marginRight: '0.5rem' }} />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} style={{ marginRight: '0.5rem' }} />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} style={{ marginRight: '0.5rem' }} />
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} style={{ marginRight: '0.5rem' }} />
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">
                  <Phone size={16} style={{ marginRight: '0.5rem' }} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <GraduationCap size={16} style={{ marginRight: '0.5rem' }} />
                  University
                </label>
                <input
                  type="text"
                  name="university"
                  className="form-input"
                  placeholder="Your university"
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Major/Field of Study</label>
                <input
                  type="text"
                  name="major"
                  className="form-input"
                  placeholder="Computer Science, Engineering, etc."
                  value={formData.major}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">GPA</label>
                <input
                  type="number"
                  name="gpa"
                  className="form-input"
                  placeholder="3.5"
                  min="0"
                  max="4"
                  step="0.1"
                  value={formData.gpa}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Expected Graduation Year</label>
              <input
                type="number"
                name="graduationYear"
                className="form-input"
                placeholder="2025"
                min="2024"
                max="2030"
                value={formData.graduationYear}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-muted">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#667eea', textDecoration: 'none' }}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 