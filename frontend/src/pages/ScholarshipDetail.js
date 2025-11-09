import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, DollarSign, User, FileText, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ScholarshipDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    personalStatement: '',
    additionalInfo: ''
  });

  useEffect(() => {
    fetchScholarship();
  }, [id]);

  const fetchScholarship = async () => {
    try {
      const response = await axios.get(`/scholarships/${id}`);
      setScholarship(response.data);
    } catch (error) {
      console.error('Error fetching scholarship:', error);
      toast.error('Scholarship not found');
      navigate('/scholarships');
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    if (applicationData.personalStatement.length < 50) {
      toast.error('Personal statement must be at least 50 characters');
      return;
    }

    setApplying(true);
    try {
      await axios.post(`/applications/${id}`, applicationData);
      toast.success('Application submitted successfully!');
      setShowApplicationForm(false);
      setApplicationData({ personalStatement: '', additionalInfo: '' });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit application';
      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading scholarship details...</div>;
  }

  if (!scholarship) {
    return null;
  }

  const isExpired = new Date() > new Date(scholarship.deadline);

  return (
    <div style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card">
          {/* Header */}
          <div className="flex-between mb-4">
            <span 
              style={{
                background: '#667eea',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '14px'
              }}
            >
              {scholarship.category}
            </span>
            <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.25rem' }}>
              ₹{scholarship.amount.toLocaleString()}
            </span>
          </div>

          <h1 style={{ color: '#374151', marginBottom: '1rem' }}>
            {scholarship.title}
          </h1>

          <div className="flex" style={{ alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} style={{ color: '#6c757d' }} />
              <span className="text-muted">{scholarship.provider}</span>
            </div>
            <div className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} style={{ color: isExpired ? '#dc3545' : '#6c757d' }} />
              <span style={{ color: isExpired ? '#dc3545' : '#6c757d' }}>
                Due: {new Date(scholarship.deadline).toLocaleDateString()}
                {isExpired && ' (Expired)'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#374151', marginBottom: '1rem' }}>Description</h3>
            <p style={{ lineHeight: '1.6', color: '#374151' }}>
              {scholarship.description}
            </p>
          </div>

          {/* Eligibility */}
          {scholarship.eligibility && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#374151', marginBottom: '1rem' }}>Eligibility Criteria</h3>
              <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
                {scholarship.eligibility.minGPA && (
                  <p><strong>Minimum GPA:</strong> {scholarship.eligibility.minGPA}</p>
                )}
                {scholarship.eligibility.majors && scholarship.eligibility.majors.length > 0 && (
                  <p><strong>Eligible Majors:</strong> {scholarship.eligibility.majors.join(', ')}</p>
                )}
                {scholarship.eligibility.universities && scholarship.eligibility.universities.length > 0 && (
                  <p><strong>Eligible Universities:</strong> {scholarship.eligibility.universities.join(', ')}</p>
                )}
                {scholarship.eligibility.graduationYear && (
                  <p><strong>Graduation Year:</strong> {scholarship.eligibility.graduationYear}</p>
                )}
                {scholarship.eligibility.other && (
                  <p><strong>Additional Requirements:</strong> {scholarship.eligibility.other}</p>
                )}
              </div>
            </div>
          )}

          {/* Requirements */}
          {scholarship.requirements && scholarship.requirements.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#374151', marginBottom: '1rem' }}>Application Requirements</h3>
              <ul style={{ paddingLeft: '1.5rem' }}>
                {scholarship.requirements.map((req, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem', color: '#374151' }}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Application URL */}
          {scholarship.applicationUrl && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#374151', marginBottom: '1rem' }}>External Application</h3>
              <p style={{ marginBottom: '1rem', color: '#6c757d' }}>
                This scholarship requires external application submission.
              </p>
              <a 
                href={scholarship.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Apply Externally
              </a>
            </div>
          )}

          {/* Apply Section */}
          {!isExpired && (
            <div style={{ marginTop: '2rem', borderTop: '1px solid #e9ecef', paddingTop: '2rem' }}>
              {!showApplicationForm ? (
                <div className="text-center">
                  <h3 style={{ color: '#374151', marginBottom: '1rem' }}>Ready to Apply?</h3>
                  <p className="text-muted" style={{ marginBottom: '1rem' }}>
                    Submit your application directly through our platform
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate('/login');
                        return;
                      }
                      setShowApplicationForm(true);
                    }}
                  >
                    <Send size={16} />
                    Apply Now
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit}>
                  <h3 style={{ color: '#374151', marginBottom: '1rem' }}>Submit Application</h3>
                  
                  <div className="form-group">
                    <label className="form-label">
                      Personal Statement *
                      <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'normal' }}>
                        (minimum 50 characters)
                      </span>
                    </label>
                    <textarea
                      className="form-input form-textarea"
                      style={{ minHeight: '120px' }}
                      placeholder="Explain why you deserve this scholarship, your goals, and how it will help you..."
                      value={applicationData.personalStatement}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        personalStatement: e.target.value
                      }))}
                      required
                    />
                    <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                      {applicationData.personalStatement.length} characters
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Additional Information</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Any additional information you'd like to share..."
                      value={applicationData.additionalInfo}
                      onChange={(e) => setApplicationData(prev => ({
                        ...prev,
                        additionalInfo: e.target.value
                      }))}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={applying || applicationData.personalStatement.length < 50}
                    >
                      {applying ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowApplicationForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {isExpired && (
            <div style={{ 
              marginTop: '2rem', 
              borderTop: '1px solid #e9ecef', 
              paddingTop: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ color: '#dc3545', fontWeight: '500' }}>
                This scholarship application deadline has passed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail; 