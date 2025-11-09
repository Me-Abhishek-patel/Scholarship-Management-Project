import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, User, Menu, X, PlusCircle, BookOpen, FileText } from 'lucide-react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #f8f9fa;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 0.5rem;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #dc3545;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 0 0 8px 8px;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/">
          <BookOpen size={24} />
          ScholarshipFinder
        </Logo>

        <NavLinks isOpen={mobileMenuOpen}>
          <NavLink to="/scholarships">
            <Search size={18} />
            Browse Scholarships
          </NavLink>
          
          {isAuthenticated && (
            <>
              <NavLink to="/dashboard">
                <FileText size={18} />
                Dashboard
              </NavLink>
              <NavLink to="/create-scholarship">
                <PlusCircle size={18} />
                Create Scholarship
              </NavLink>
              <NavLink to="/applications">
                <FileText size={18} />
                My Applications
              </NavLink>
            </>
          )}
        </NavLinks>

        <UserMenu>
          {isAuthenticated ? (
            <>
              <UserButton 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)}
              >
                <User size={18} />
                {user?.name}
              </UserButton>
              <DropdownMenu isOpen={userMenuOpen}>
                <DropdownItem to="/profile">Profile</DropdownItem>
                <DropdownButton onClick={handleLogout}>
                  Logout
                </DropdownButton>
              </DropdownMenu>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: '8px' 
              }}>
                Register
              </NavLink>
            </div>
          )}
          
          <MobileMenuButton 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </UserMenu>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar; 