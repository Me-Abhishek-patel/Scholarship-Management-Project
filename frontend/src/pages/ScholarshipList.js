import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, DollarSign, MapPin } from 'lucide-react';
import axios from 'axios';

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    minAmount: '',
    maxAmount: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });

  useEffect(() => {
    fetchScholarships();
  }, [filters, pagination.currentPage]);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== '' && v !== 'All'))
      });

      const response = await axios.get(`/scholarships?${params}`);
      setScholarships(response.data.scholarships);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchScholarships();
  };

  const categories = [
    'All', 'Academic', 'Sports', 'Arts', 'Community Service', 
    'Need-based', 'Merit-based', 'Research', 'Other'
  ];

  return (
    <div style={{ padding: '40px 20px', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        <div className="text-center mb-4">
          <h1 style={{ color: '#374151', marginBottom: '1rem' }}>Browse Scholarships</h1>
          <p className="text-muted">Find the perfect scholarship opportunities for your education</p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-4">
          <form onSubmit={handleSearch}>
            <div className="grid grid-2 gap-4">
              <div className="form-group">
                <label className="form-label">
                  <Search size={16} style={{ marginRight: '0.5rem' }} />
                  Search Scholarships
                </label>
                <input
                  type="text"
                  name="search"
                  className="form-input"
                  placeholder="Search by title, provider, or description..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Filter size={16} style={{ marginRight: '0.5rem' }} />
                  Category
                </label>
                <select
                  name="category"
                  className="form-select"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Minimum Amount (₹)</label>
                <input
                  type="number"
                  name="minAmount"
                  className="form-input"
                  placeholder="0"
                  value={filters.minAmount}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Maximum Amount (₹)</label>
                <input
                  type="number"
                  name="maxAmount"
                  className="form-input"
                  placeholder="100000"
                  value={filters.maxAmount}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              <Search size={16} />
              Search Scholarships
            </button>
          </form>
        </div>

        {/* Results */}
        {loading ? (
          <div className="loading">Loading scholarships...</div>
        ) : (
          <>
            <div className="flex-between mb-4">
              <p className="text-muted">
                Showing {scholarships.length} of {pagination.totalItems} scholarships
              </p>
            </div>

            <div className="grid grid-3">
              {scholarships.map(scholarship => (
                <div key={scholarship._id} className="card">
                  <div className="flex-between mb-4">
                    <span 
                      style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px'
                      }}
                    >
                      {scholarship.category}
                    </span>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                      ₹{scholarship.amount.toLocaleString()}
                    </span>
                  </div>

                  <h3 style={{ marginBottom: '0.5rem', color: '#374151' }}>
                    {scholarship.title}
                  </h3>
                  
                  <p className="text-muted" style={{ marginBottom: '1rem' }}>
                    {scholarship.provider}
                  </p>

                  <p style={{ 
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {scholarship.description}
                  </p>

                  <div className="flex-between" style={{ marginBottom: '1rem' }}>
                    <div className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={16} style={{ color: '#6c757d' }} />
                      <span style={{ fontSize: '14px', color: '#6c757d' }}>
                        Due: {new Date(scholarship.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Link 
                    to={`/scholarships/${scholarship._id}`}
                    className="btn btn-outline"
                    style={{ width: '100%' }}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>

            {scholarships.length === 0 && (
              <div className="text-center p-4">
                <p className="text-muted">No scholarships found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex-center mt-4">
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`btn ${page === pagination.currentPage ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: page }))}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScholarshipList; 