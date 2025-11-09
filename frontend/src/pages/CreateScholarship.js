import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, DollarSign, Calendar, FileText } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateScholarship = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    provider: '',
    amount: '',
    category: 'Academic',
    deadline: '',
    applicationUrl: '',
    requirements: [''],
    eligibility: {
      minGPA: '',
      majors: [''],
      universities: [''],
      graduationYear: '',
      other: ''
    }
  });

  const categories = [
    'Academic', 'Sports', 'Arts', 'Community Service', 
    'Need-based', 'Merit-based', 'Research', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEligibilityChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [name]: value
      }
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleEligibilityArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [field]: prev.eligibility[field].map((item, i) => i === index ? value : item)
      }
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const addEligibilityArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [field]: [...prev.eligibility[field], '']
      }
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const removeEligibilityArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [field]: prev.eligibility[field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.description || !formData.provider || 
        !formData.amount || !formData.deadline) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Clean up arrays
    const cleanData = {
      ...formData,
      requirements: formData.requirements.filter(req => req.trim() !== ''),
      eligibility: {
        ...formData.eligibility,
        majors: formData.eligibility.majors.filter(major => major.trim() !== ''),
        universities: formData.eligibility.universities.filter(uni => uni.trim() !== '')
      }
    };

    setLoading(true);
    try {
      const response = await axios.post('/scholarships', cleanData);
      toast.success('Scholarship created successfully!');
      navigate(`/scholarships/${response.data.scholarship._id}`);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create scholarship';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card">
          <div className="text-center mb-4">
            <PlusCircle size={48} style={{ color: '#667eea', marginBottom: '1rem' }} />
            <h1 style={{ color: '#374151', marginBottom: '0.5rem' }}>Create New Scholarship</h1>
            <p className="text-muted">Help students achieve their educational goals</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Scholarship Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="e.g. Academic Excellence Scholarship"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Provider/Organization *</label>
                <input
                  type="text"
                  name="provider"
                  className="form-input"
                  placeholder="Your organization name"
                  value={formData.provider}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                className="form-input form-textarea"
                placeholder="Describe the scholarship, its purpose, and what you're looking for in applicants..."
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">
                  <DollarSign size={16} style={{ marginRight: '0.5rem' }} />
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  name="amount"
                  className="form-input"
                  placeholder="5000"
                  min="1"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} style={{ marginRight: '0.5rem' }} />
                  Application Deadline *
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="form-input"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">External Application URL</label>
                <input
                  type="url"
                  name="applicationUrl"
                  className="form-input"
                  placeholder="https://example.com/apply"
                  value={formData.applicationUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Eligibility Criteria */}
            <h3 style={{ color: '#374151', marginTop: '2rem', marginBottom: '1rem' }}>
              Eligibility Criteria
            </h3>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Minimum GPA</label>
                <input
                  type="number"
                  name="minGPA"
                  className="form-input"
                  placeholder="3.0"
                  min="0"
                  max="4"
                  step="0.1"
                  value={formData.eligibility.minGPA}
                  onChange={handleEligibilityChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Graduation Year</label>
                <input
                  type="number"
                  name="graduationYear"
                  className="form-input"
                  placeholder="2025"
                  min="2024"
                  max="2030"
                  value={formData.eligibility.graduationYear}
                  onChange={handleEligibilityChange}
                />
              </div>
            </div>

            {/* Eligible Majors */}
            <div className="form-group">
              <label className="form-label">Eligible Majors</label>
              {formData.eligibility.majors.map((major, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Computer Science, Engineering"
                    value={major}
                    onChange={(e) => handleEligibilityArrayChange('majors', index, e.target.value)}
                  />
                  {formData.eligibility.majors.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeEligibilityArrayItem('majors', index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => addEligibilityArrayItem('majors')}
              >
                Add Major
              </button>
            </div>

            {/* Requirements */}
            <h3 style={{ color: '#374151', marginTop: '2rem', marginBottom: '1rem' }}>
              Application Requirements
            </h3>

            <div className="form-group">
              {formData.requirements.map((requirement, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Official transcript, Letter of recommendation"
                    value={requirement}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeArrayItem('requirements', index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => addArrayItem('requirements')}
              >
                Add Requirement
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Additional Eligibility Information</label>
              <textarea
                name="other"
                className="form-input form-textarea"
                placeholder="Any other eligibility criteria or requirements..."
                value={formData.eligibility.other}
                onChange={handleEligibilityChange}
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Scholarship'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateScholarship; 