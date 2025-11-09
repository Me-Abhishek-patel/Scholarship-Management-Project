import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Target, Users, Award, BookOpen, TrendingUp } from 'lucide-react';
import styled from 'styled-components';
import axios from 'axios';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
  }
  
  &.secondary:hover {
    background: white;
    color: #667eea;
  }
`;

const StatsSection = styled.section`
  padding: 60px 0;
  background: white;
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled.div`
  padding: 2rem 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6c757d;
  font-weight: 500;
`;

const FeaturesSection = styled.section`
  padding: 80px 0;
  background: #f8fafc;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #374151;
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6c757d;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #374151;
`;

const FeatureDescription = styled.p`
  color: #6c757d;
  line-height: 1.6;
`;

const Home = () => {
  const [stats, setStats] = useState({
    scholarships: 0,
    applications: 0,
    users: 0
  });

  useEffect(() => {
    // Simulate fetching stats
    setStats({
      scholarships: 150,
      applications: 1200,
      users: 500
    });
  }, []);

  const features = [
    {
      icon: <Search size={24} />,
      title: "Smart Search",
      description: "Find scholarships that match your profile with our intelligent search and filtering system."
    },
    {
      icon: <Target size={24} />,
      title: "Perfect Matches",
      description: "Get personalized scholarship recommendations based on your academic background and interests."
    },
    {
      icon: <Users size={24} />,
      title: "Easy Applications",
      description: "Apply to multiple scholarships with a streamlined application process and track your progress."
    },
    {
      icon: <Award size={24} />,
      title: "Success Tracking",
      description: "Monitor your application status and get notified when decisions are made."
    }
  ];

  return (
    <div>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Find Your Perfect Scholarship</HeroTitle>
          <HeroSubtitle>
            Discover thousands of scholarship opportunities and take the next step towards your educational dreams.
          </HeroSubtitle>
          <CTAButtons>
            <CTAButton to="/scholarships">
              <Search size={20} />
              Browse Scholarships
            </CTAButton>
            <CTAButton to="/register" className="secondary">
              <BookOpen size={20} />
              Get Started
            </CTAButton>
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsGrid>
          <StatCard>
            <StatNumber>{stats.scholarships}+</StatNumber>
            <StatLabel>Active Scholarships</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.applications}+</StatNumber>
            <StatLabel>Applications Submitted</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.users}+</StatNumber>
            <StatLabel>Students Helped</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>₹15Cr+</StatNumber>
            <StatLabel>Scholarships Awarded</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>Why Choose ScholarshipFinder?</SectionTitle>
          <SectionSubtitle>
            We make finding and applying for scholarships simple, efficient, and successful.
          </SectionSubtitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>
    </div>
  );
};

export default Home; 