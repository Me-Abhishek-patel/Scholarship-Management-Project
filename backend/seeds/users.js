const bcrypt = require('bcryptjs');

const users = [
  {
    name: "Admin User",
    email: "admin@scholarships.com",
    password: "admin123", // Will be hashed during seeding
    phone: "+91-9876543210",
    university: "Administrative Office",
    major: "Administration",
    gpa: 4.0,
    graduationYear: 2024
  },
  {
    name: "Dr. Priya Sharma",
    email: "priya.sharma@education.gov.in",
    password: "priya123",
    phone: "+91-9876543211",
    university: "Ministry of Education",
    major: "Educational Administration",
    gpa: 3.9,
    graduationYear: 2020
  },
  {
    name: "Rahul Kumar",
    email: "rahul.kumar@student.edu",
    password: "rahul123",
    phone: "+91-9876543212",
    university: "Indian Institute of Technology Delhi",
    major: "Computer Science",
    gpa: 3.8,
    graduationYear: 2025
  },
  {
    name: "Sneha Patel",
    email: "sneha.patel@student.edu",
    password: "sneha123",
    phone: "+91-9876543213",
    university: "Jawaharlal Nehru University",
    major: "Mathematics",
    gpa: 3.7,
    graduationYear: 2025
  },
  {
    name: "Arjun Singh",
    email: "arjun.singh@student.edu",
    password: "arjun123",
    phone: "+91-9876543214",
    university: "Indian Institute of Science Bangalore",
    major: "Physics",
    gpa: 3.9,
    graduationYear: 2026
  }
];

// Hash passwords before exporting
const hashPasswords = async (users) => {
  const hashedUsers = [];
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    hashedUsers.push({
      ...user,
      password: hashedPassword
    });
  }
  return hashedUsers;
};

module.exports = { users, hashPasswords }; 