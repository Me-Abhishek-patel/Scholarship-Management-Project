import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, DollarSign, Eye, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [receivedApplications, setReceivedApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('submitted');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const [submittedRes, receivedRes] = await Promise.all([
        axios.get('/applications/my'),
        axios.get('/applications/received')
      ]);
      
      setApplications(submittedRes.data);
      setReceivedApplications(receivedRes.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await axios.put(`/applications/${applicationId}/status`, { status: newStatus });
      toast.success('Application status updated');
      fetchApplications();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleWithdraw = async (applicationId) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    try {
      await axios.delete(`/applications/${applicationId}`);
      toast.success('Application withdrawn');
      fetchApplications();
    } catch (error) {
      toast.error('Failed to withdraw application');
    }
  };

  if (loading) {
    return <div className="loading">Loading applications...</div>;
  }

  return (
    <div style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        <div className="text-center mb-4">
          <h1 style={{ color: '#374151', marginBottom: '1rem' }}>My Applications</h1>
          <p className="text-muted">Track your scholarship applications and manage received ones</p>
        </div>

        {/* Tab Navigation */}
        <div className="card mb-4">
          <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef' }}>
            <button
              className={`btn ${activeTab === 'submitted' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('submitted')}
              style={{ borderRadius: '0', border: 'none', borderBottom: activeTab === 'submitted' ? '2px solid #667eea' : 'none' }}
            >
              <FileText size={16} />
              Submitted Applications ({applications.length})
            </button>
            <button
              className={`btn ${activeTab === 'received' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('received')}
              style={{ borderRadius: '0', border: 'none', borderBottom: activeTab === 'received' ? '2px solid #667eea' : 'none' }}
            >
              <Eye size={16} />
              Received Applications ({receivedApplications.length})
            </button>
          </div>
        </div>

        {/* Submitted Applications Tab */}
        {activeTab === 'submitted' && (
          <div>
            {applications.length > 0 ? (
              <div className="grid">
                {applications.map((application) => (
                  <div key={application._id} className="card">
                    <div className="flex-between mb-4">
                      <div>
                        <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>
                          {application.scholarship.title}
                        </h3>
                        <p className="text-muted">{application.scholarship.provider}</p>
                      </div>
                      <div className="text-center">
                        <div style={{ color: '#28a745', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                          ₹{application.scholarship.amount.toLocaleString()}
                        </div>
                        <span className={`status-badge status-${application.status}`}>
                          {application.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-2 gap-4 mb-4">
                      <div>
                        <strong>Applied:</strong> {new Date(application.submittedAt).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Deadline:</strong> {new Date(application.scholarship.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <strong>Personal Statement:</strong>
                      <p style={{ 
                        marginTop: '0.5rem',
                        padding: '0.75rem',
                        background: '#f8f9fa',
                        borderRadius: '6px',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        {application.personalStatement.length > 200 
                          ? `${application.personalStatement.substring(0, 200)}...`
                          : application.personalStatement
                        }
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Link 
                        to={`/scholarships/${application.scholarship._id}`}
                        className="btn btn-outline"
                      >
                        View Scholarship
                      </Link>
                      {application.status === 'pending' && new Date() < new Date(application.scholarship.deadline) && (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleWithdraw(application._id)}
                        >
                          <Trash2 size={16} />
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center">
                <FileText size={48} style={{ color: '#6c757d', marginBottom: '1rem' }} />
                <h3 style={{ color: '#374151', marginBottom: '1rem' }}>No Applications Yet</h3>
                <p className="text-muted" style={{ marginBottom: '1rem' }}>
                  Start applying for scholarships to see them here.
                </p>
                <Link to="/scholarships" className="btn btn-primary">
                  Browse Scholarships
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Received Applications Tab */}
        {activeTab === 'received' && (
          <div>
            {receivedApplications.length > 0 ? (
              <div className="grid">
                {receivedApplications.map((application) => (
                  <div key={application._id} className="card">
                    <div className="flex-between mb-4">
                      <div>
                        <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>
                          {application.scholarship.title}
                        </h3>
                        <p className="text-muted">
                          Applied by: {application.applicant.name} ({application.applicant.email})
                        </p>
                      </div>
                      <div className="text-center">
                        <div style={{ color: '#28a745', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                          ₹{application.scholarship.amount.toLocaleString()}
                        </div>
                        <span className={`status-badge status-${application.status}`}>
                          {application.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-2 gap-4 mb-4">
                      <div>
                        <strong>Applied:</strong> {new Date(application.submittedAt).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Deadline:</strong> {new Date(application.scholarship.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Applicant Details */}
                    <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ marginBottom: '0.5rem' }}>Applicant Information</h4>
                      <div className="grid grid-2 gap-4">
                        <div><strong>University:</strong> {application.applicant.university || 'Not specified'}</div>
                        <div><strong>Major:</strong> {application.applicant.major || 'Not specified'}</div>
                        <div><strong>GPA:</strong> {application.applicant.gpa || 'Not specified'}</div>
                        <div><strong>Graduation Year:</strong> {application.applicant.graduationYear || 'Not specified'}</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <strong>Personal Statement:</strong>
                      <p style={{ 
                        marginTop: '0.5rem',
                        padding: '0.75rem',
                        background: 'white',
                        border: '1px solid #e9ecef',
                        borderRadius: '6px',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        {application.personalStatement}
                      </p>
                    </div>

                    {application.additionalInfo && (
                      <div style={{ marginBottom: '1rem' }}>
                        <strong>Additional Information:</strong>
                        <p style={{ 
                          marginTop: '0.5rem',
                          padding: '0.75rem',
                          background: 'white',
                          border: '1px solid #e9ecef',
                          borderRadius: '6px',
                          fontSize: '14px',
                          lineHeight: '1.5'
                        }}>
                          {application.additionalInfo}
                        </p>
                      </div>
                    )}

                    {/* Status Update Actions */}
                    <div>
                      <strong style={{ marginBottom: '0.5rem', display: 'block' }}>Update Status:</strong>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleStatusUpdate(application._id, 'under_review')}
                          disabled={application.status === 'under_review'}
                        >
                          Under Review
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => handleStatusUpdate(application._id, 'approved')}
                          disabled={application.status === 'approved'}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleStatusUpdate(application._id, 'rejected')}
                          disabled={application.status === 'rejected'}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center">
                <Eye size={48} style={{ color: '#6c757d', marginBottom: '1rem' }} />
                <h3 style={{ color: '#374151', marginBottom: '1rem' }}>No Applications Received</h3>
                <p className="text-muted" style={{ marginBottom: '1rem' }}>
                  Applications for your scholarships will appear here.
                </p>
                <Link to="/create-scholarship" className="btn btn-primary">
                  Create Scholarship
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications; 