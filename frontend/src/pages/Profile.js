import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, GraduationCap, Save } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    university: user?.university || '',
    major: user?.major || '',
    gpa: user?.gpa || '',
    graduationYear: user?.graduationYear || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await updateProfile(formData);
    if (result.success) {
      // Profile updated successfully (toast already shown in context)
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card">
          <div className="text-center mb-4">
            <User size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
            <h1 style={{ color: '#374151', marginBottom: '0.5rem' }}>My Profile</h1>
            <p className="text-muted">Update your personal information</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">
                  <User size={16} style={{ marginRight: '0.5rem' }} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} style={{ marginRight: '0.5rem' }} />
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={user?.email || ''}
                  disabled
                  style={{ background: '#f8f9fa', cursor: 'not-allowed' }}
                />
                <div className="error-message">Email cannot be changed</div>
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
              style={{ width: '100%' }}
              disabled={loading}
            >
              <Save size={16} />
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          {/* Account Information */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid #e9ecef', paddingTop: '2rem' }}>
            <h3 style={{ color: '#374151', marginBottom: '1rem' }}>Account Information</h3>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Member since:</strong> {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Account ID:</strong> {user?._id || 'N/A'}
              </div>
              <div>
                <strong>Last updated:</strong> {new Date(user?.updatedAt || Date.now()).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: '#374151', marginBottom: '1rem' }}>Profile Completion</h3>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Profile Completion</span>
                  <span>{Math.round(getProfileCompletion())}%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  background: '#e9ecef', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div 
                    style={{ 
                      width: `${getProfileCompletion()}%`, 
                      height: '100%', 
                      background: getProfileCompletion() >= 80 ? '#28a745' : getProfileCompletion() >= 50 ? '#ffc107' : '#dc3545',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#6c757d', margin: 0 }}>
                Complete your profile to get better scholarship recommendations and increase your chances of being selected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function getProfileCompletion() {
    const fields = [
      user?.name,
      user?.email,
      user?.phone,
      user?.university,
      user?.major,
      user?.gpa,
      user?.graduationYear
    ];
    
    const completedFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return (completedFields / fields.length) * 100;
  }
};

export default Profile; 