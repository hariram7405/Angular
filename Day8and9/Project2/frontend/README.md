# Bug Tracking System

A comprehensive Angular 20.2.0 application for bug tracking and project management with advanced role-based access control, real-time analytics, and modern UI components.

## 🚀 Overview

This enterprise-grade bug tracking system provides a complete solution for managing software defects, project assignments, and team collaboration. Built with Angular 20.2.0, it features a modern responsive design using PrimeNG components and Chart.js for data visualization.

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Angular CLI** (v20.2.0)
- **Backend API** running on `https://localhost:7028`

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Ensure your backend API is running on `https://localhost:7028` before starting the application.

## 🏃‍♂️ Development

### Start Development Server
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you make changes to source files.

### Watch Mode
```bash
npm run watch
```

## 🏗️ Build

### Production Build
```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

### Development Build
```bash
ng build --configuration development
```

## 🧪 Testing

```bash
npm test
```

Executes unit tests via Karma and Jasmine.

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication**: Secure token-based login system
- **Role-based Access Control**: Admin, Tester, and User roles
- **Route Guards**: Protected routes with authentication and role validation
- **User Registration**: Self-service account creation
- **Session Management**: Automatic token handling and logout

### 🐛 Bug Management
- **Create Bug Reports**: Comprehensive bug creation with rich text descriptions
- **Edit & Update**: Full CRUD operations for bug management
- **Priority Levels**: High, Medium, Low priority classification
- **Status Tracking**: Open, In Progress, Closed status workflow
- **Project Assignment**: Link bugs to specific projects
- **User Assignment**: Assign bugs to team members (Admin only)
- **Bug Details**: Detailed view with commenting system
- **Filtering & Sorting**: Advanced filtering by status, priority, project, and date

### 📊 Admin Dashboard
- **Real-time Analytics**: Live bug statistics and metrics
- **Interactive Charts**: 
  - Pie charts for open vs resolved bugs
  - Bar charts for status distribution
  - Doughnut charts for priority breakdown
  - Project-wise bug distribution
  - Assignment status visualization
- **Key Metrics**: Total bugs, pending issues, high priority alerts
- **User Management**: View and manage system users
- **Project Overview**: Project-based bug analytics

### 🎨 UI/UX Features
- **PrimeNG Components**: Professional UI component library
- **Responsive Design**: Mobile-first responsive layout
- **Chart.js Integration**: Interactive data visualizations
- **Modern Styling**: Clean, professional interface
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error messages and validation

## 🛣️ Application Routes

| Route | Component | Access Level | Description |
|-------|-----------|--------------|-------------|
| `/login` | LoginComponent | Public | User authentication |
| `/register` | RegisterComponent | Public | User registration |
| `/dashboard` | DashboardComponent | Authenticated | User dashboard |
| `/admin-dashboard` | AdminDashboardComponent | Admin Only | Analytics and metrics |
| `/bugs` | BugsComponent | Authenticated | Bug listing and management |
| `/new-bug` | NewBugComponent | Authenticated | Create new bug report |
| `/edit-bug/:id` | NewBugComponent | Authenticated | Edit existing bug |
| `/bug-detail/:id` | BugDetailComponent | Authenticated | View bug details |
| `/unauthorized` | UnauthorizedComponent | Public | Access denied page |

## 🏗️ Project Architecture

```
src/app/
├── guards/                    # Route protection
│   ├── auth.guard.ts         # Authentication guard
│   ├── role.guard.ts         # Role-based access guard
│   └── admin.guard.ts        # Admin-specific guard
├── pages/                     # Feature components
│   ├── bugs/                 # Bug listing and management
│   │   ├── bugs.ts
│   │   ├── bugs.html
│   │   └── bugs.css
│   ├── dashboard/            # User dashboard
│   ├── login/                # Authentication
│   ├── new-bug/              # Bug creation/editing
│   └── register/             # User registration
├── services/                  # Business logic
│   ├── authservice.ts        # Authentication service
│   └── bugservice.ts         # Bug management service
├── interceptors/              # HTTP interceptors
├── components/                # Shared components
└── app.routes.ts             # Application routing
```

## 🔧 Configuration

### API Endpoints
- **Base URL**: `https://localhost:7028/api`
- **Authentication**: `/auth/login`, `/auth/register`
- **Bug Management**: `/Bug`
- **Projects**: `/Project`
- **Users**: `/User`

### Environment Variables
The application uses Angular's environment configuration for API endpoints and other settings.

## 🚀 Deployment

### Production Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your web server

3. Configure your web server to serve the Angular application and handle routing

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]
```

## 🔒 Security Features

- **JWT Token Authentication**: Secure API communication
- **Role-based Authorization**: Granular access control
- **Route Protection**: Authenticated and authorized access only
- **Input Validation**: Client-side form validation
- **HTTPS Communication**: Secure API endpoints

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core bug tracking features
- **v1.1.0** - Added admin dashboard and analytics
- **v1.2.0** - Enhanced UI/UX with PrimeNG components
- **v2.0.0** - Angular 20.2.0 upgrade and performance improvements

---

**Built with ❤️ using Angular 20.2.0, PrimeNG, and Chart.js**