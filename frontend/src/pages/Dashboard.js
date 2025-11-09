import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, FileText, Award, Clock, TrendingUp } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    applications: 0,
    scholarships: 0,
    pending: 0,
    approved: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [applicationsRes, scholarshipsRes] = await Promise.all([
        axios.get('/applications/my'),
        axios.get('/scholarships/user/created')
      ]);

      const applications = applicationsRes.data;
      const scholarships = scholarshipsRes.data;

      setStats({
        applications: applications.length,
        scholarships: scholarships.length,
        pending: applications.filter(app => app.status === 'pending').length,
        approved: applications.filter(app => app.status === 'approved').length
      });

      setRecentApplications(applications.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        <div className="flex-between mb-4">
          <div>
            <h1 style={{ color: '#374151', marginBottom: '0.5rem' }}>
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted">Here's what's happening with your scholarships</p>
          </div>
          <Link to="/create-scholarship" className="btn btn-primary">
            <PlusCircle size={20} />
            Create Scholarship
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-2 mb-4">
          <div className="card">
            <div className="flex-between">
              <div>
                <h3 style={{ color: '#667eea', fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {stats.applications}
                </h3>
                <p className="text-muted">Applications Submitted</p>
              </div>
              <FileText size={32} style={{ color: '#667eea' }} />
            </div>
          </div>

          <div className="card">
            <div className="flex-between">
              <div>
                <h3 style={{ color: '#28a745', fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {stats.scholarships}
                </h3>
                <p className="text-muted">Scholarships Created</p>
              </div>
              <Award size={32} style={{ color: '#28a745' }} />
            </div>
          </div>

          <div className="card">
            <div className="flex-between">
              <div>
                <h3 style={{ color: '#ffc107', fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {stats.pending}
                </h3>
                <p className="text-muted">Pending Applications</p>
              </div>
              <Clock size={32} style={{ color: '#ffc107' }} />
            </div>
          </div>

          <div className="card">
            <div className="flex-between">
              <div>
                <h3 style={{ color: '#28a745', fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {stats.approved}
                </h3>
                <p className="text-muted">Approved Applications</p>
              </div>
              <TrendingUp size={32} style={{ color: '#28a745' }} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-3 mb-4">
          <Link to="/scholarships" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="text-center">
              <Award size={32} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Browse Scholarships</h3>
              <p className="text-muted">Find new opportunities</p>
            </div>
          </Link>

          <Link to="/applications" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="text-center">
              <FileText size={32} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>My Applications</h3>
              <p className="text-muted">Track application status</p>
            </div>
          </Link>

          <Link to="/profile" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="text-center">
              <PlusCircle size={32} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Update Profile</h3>
              <p className="text-muted">Keep information current</p>
            </div>
          </Link>
        </div>

        {/* Recent Applications */}
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: '#374151' }}>Recent Applications</h2>
          {recentApplications.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Scholarship</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Provider</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Applied Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((application) => (
                    <tr key={application._id} style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '1rem' }}>{application.scholarship.title}</td>
                      <td style={{ padding: '1rem' }}>{application.scholarship.provider}</td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`status-badge status-${application.status}`}>
                          {application.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-4">
              <p className="text-muted">No applications yet. Start by browsing scholarships!</p>
              <Link to="/scholarships" className="btn btn-primary mt-4">
                Browse Scholarships
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 