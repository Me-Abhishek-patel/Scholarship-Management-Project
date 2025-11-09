<img width="1470" height="879" alt="Screenshot 2025-11-09 at 12 23 22" src="https://github.com/user-attachments/assets/bd5925f5-1605-4d43-96ba-c573db41037f" />


# 🎓 Scholarship Finder System

A comprehensive MERN stack application that helps students find and apply for scholarships while enabling scholarship providers to post and manage their offerings.

![Scholarship Finder](https://img.shields.io/badge/MERN-Stack-blue) ![Docker](https://img.shields.io/badge/Docker-Containerized-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### For Students
- **User Registration & Authentication** - Secure email/password authentication
- **Profile Management** - Complete academic profiles with GPA, university, major, etc.
- **Advanced Scholarship Search** - Filter by category, amount, deadline, and keywords
- **Direct Application System** - Apply to scholarships directly through the platform
- **Application Tracking** - Monitor application status and deadlines
- **Dashboard Overview** - View statistics and recent activities

### For Scholarship Providers
- **Scholarship Creation** - Post new scholarship opportunities
- **Application Management** - Review and manage received applications
- **Applicant Evaluation** - View detailed applicant profiles and statements
- **Status Updates** - Approve, reject, or mark applications under review
- **Analytics Dashboard** - Track scholarship performance and applications

### General Features
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Notifications** - Toast notifications for all user actions
- **Search & Filtering** - Advanced search capabilities with multiple filters
- **Clean UI/UX** - Modern, intuitive interface built with styled-components
- **Secure API** - JWT-based authentication and protected routes

## 🛠️ Technology Stack

- **Frontend:** React 18, React Router, Styled Components, Axios, React Hook Form
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
- **Authentication:** JSON Web Tokens (JWT) with bcrypt password hashing
- **Containerization:** Docker & Docker Compose
- **Database:** MongoDB with comprehensive indexes for search
- **UI Libraries:** Lucide React (icons), React Hot Toast (notifications)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Docker Desktop** (latest version)
- **Docker Compose** (usually included with Docker Desktop)
- **Git** (for cloning the repository)

## 🚀 Quick Start

### Step 1. Clone the Repository

```bash
git clone <your-repository-url> or download and extract Zip for this link (https://github.com/Me-Abhishek-patel/Scholarship-Management-Project/archive/refs/heads/main.zip)
cd scholarship-finder
```

### Step 2. Environment Configuration (Optional)

Create a `.env` file in the root directory (optional - defaults will work):

```env
# Backend Configuration
MONGODB_URI=mongodb://mongodb:27017/scholarship_finder
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3. Start the Application

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### Step 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Database:** MongoDB runs on localhost:27017

### Step 5. Stop the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

## 📁 Project Structure

```
scholarship-finder/
├── docker-compose.yml          # Docker orchestration
├── README.md                   # Project documentation
├── 
├── backend/                    # Node.js Express API
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js              # Main server file
│   ├── models/                # MongoDB models
│   │   ├── User.js
│   │   ├── Scholarship.js
│   │   └── Application.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── scholarships.js
│   │   └── applications.js
│   └── middleware/            # Custom middleware
│       └── auth.js
│
└── frontend/                  # React application
    ├── Dockerfile
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js             # Main app component
        ├── App.css            # Global styles
        ├── index.js           # React entry point
        ├── context/           # React context
        │   └── AuthContext.js
        ├── components/        # Reusable components
        │   └── Navbar.js
        └── pages/             # Page components
            ├── Home.js
            ├── Login.js
            ├── Register.js
            ├── Dashboard.js
            ├── ScholarshipList.js
            ├── ScholarshipDetail.js
            ├── CreateScholarship.js
            ├── Applications.js
            └── Profile.js
```

## 🔧 Development

### Running in Development Mode

For development with hot reloading:

```bash
# Start backend only
cd backend
npm install
npm run dev

# Start frontend only (in new terminal)
cd frontend
npm install
npm start

# Start MongoDB separately
docker run -d -p 27017:27017 --name scholarship-db mongo:7.0
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile

#### Scholarships
- `GET /api/scholarships` - Get all scholarships (with filters)
- `GET /api/scholarships/:id` - Get scholarship by ID
- `POST /api/scholarships` - Create new scholarship (auth required)
- `PUT /api/scholarships/:id` - Update scholarship (owner only)
- `DELETE /api/scholarships/:id` - Delete scholarship (owner only)
- `GET /api/scholarships/user/created` - Get user's created scholarships

#### Applications
- `GET /api/applications/my` - Get user's applications
- `GET /api/applications/received` - Get applications for user's scholarships
- `POST /api/applications/:scholarshipId` - Submit application
- `PUT /api/applications/:id/status` - Update application status
- `GET /api/applications/:id` - Get application details
- `DELETE /api/applications/:id` - Withdraw application

## 🔒 Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Authentication:** Secure token-based authentication
- **Input Validation:** Server-side validation using express-validator
- **CORS Protection:** Cross-origin request protection
- **Route Protection:** Protected routes requiring authentication
- **Data Sanitization:** Mongoose schema validation

## 🧪 Testing the Application

### Sample Data Flow

1. **Register a new account** at http://localhost:3000/register
2. **Complete your profile** with academic information
3. **Browse scholarships** or **create a new scholarship**
4. **Apply to scholarships** with personal statements
5. **Track applications** on the dashboard
6. **Manage received applications** if you created scholarships

### Test User Journey

```bash
# 1. Create a scholarship provider account
Email: provider@test.com
Password: password123

# 2. Create a student account  
Email: student@test.com
Password: password123

# 3. As provider: Create a scholarship
Title: "Tech Excellence Scholarship"
Amount: $5000
Category: Academic
Deadline: Future date

# 4. As student: Apply to the scholarship
Add personal statement and submit

# 5. As provider: Review and update application status
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Check if ports are in use
   lsof -i :3000  # Frontend
   lsof -i :5000  # Backend
   lsof -i :27017 # MongoDB
   ```

2. **Docker issues:**
   ```bash
   # Rebuild containers
   docker-compose down
   docker-compose up --build --force-recreate
   
   # Clear Docker cache
   docker system prune -a
   ```

3. **Database connection issues:**
   ```bash
   # Check MongoDB container
   docker-compose logs mongodb
   
   # Reset database
   docker-compose down -v
   docker-compose up
   ```

4. **Frontend build issues:**
   ```bash
   # Clear npm cache
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

### Environment Variables

If you need custom configuration, create a `.env` file:

```env
# Database
MONGODB_URI=mongodb://mongodb:27017/scholarship_finder

# JWT Secret (change in production)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=5000

# Environment
NODE_ENV=development

# Frontend API URL
REACT_APP_API_URL=http://localhost:5000/api
```

## 📈 Performance Considerations

- **Database Indexes:** Implemented for search functionality
- **Pagination:** Built-in pagination for large datasets
- **Image Optimization:** Responsive images and proper sizing
- **Code Splitting:** React lazy loading for optimal bundle size
- **Caching:** Browser caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Email notifications for application updates
- [ ] File upload for application documents
- [ ] Advanced search with AI-powered recommendations
- [ ] Integration with external scholarship databases
- [ ] Multi-language support
- [ ] Analytics dashboard for administrators
- [ ] Mobile app development
- [ ] Payment integration for scholarship disbursement

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for students and scholarship providers worldwide**

Made for educational purposes as a college project demonstrating MERN stack development with Docker containerization. 
