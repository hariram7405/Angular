# Bug Tracker Application

A comprehensive full-stack bug tracking system built with Angular 20.2 frontend and .NET 8.0 backend, featuring JWT authentication, role-based access control, and modern UI components.

## 🚀 Features

### Frontend Features
- **Complete CRUD Operations**: Create, read, update, and delete bugs
- **JWT Authentication**: Secure login/register system with token-based authentication
- **Role-Based Access Control**: Admin, Developer, and Tester roles with different permissions
- **Advanced Filtering**: Search by title, status, priority with real-time filtering
- **Responsive Design**: Mobile-friendly UI built with PrimeNG components
- **Dark Theme**: Professional dark color scheme
- **Form Validation**: Client-side validation with user-friendly error messages
- **Route Guards**: Protected routes based on authentication status

### Backend Features
- **RESTful API**: Complete CRUD operations with proper HTTP status codes
- **Clean Architecture**: Separated into API, Core, Infrastructure, and Application layers
- **Entity Framework Core**: Database operations with SQL Server
- **JWT Token Security**: Secure authentication with configurable token settings
- **Role-Based Authorization**: Endpoint-level security based on user roles
- **Database Seeding**: Automatic database initialization with sample data
- **Swagger Documentation**: Interactive API documentation
- **Global Exception Handling**: Centralized error handling middleware
- **CORS Configuration**: Configured for Angular frontend integration

## 🛠 Tech Stack

### Frontend
- **Angular**: 20.2.1
- **PrimeNG**: 17.18.15 (UI Components)
- **PrimeFlex**: 4.0.0 (CSS Utilities)
- **PrimeIcons**: 7.0.0 (Icon Library)
- **TypeScript**: 5.9.2
- **RxJS**: 7.8.0 (Reactive Programming)

### Backend
- **.NET**: 8.0
- **Entity Framework Core**: 9.0.8
- **SQL Server**: Database engine
- **AutoMapper**: 12.0.0 (Object mapping)
- **JWT Bearer**: 8.0.8 (Authentication)
- **Swashbuckle**: 6.6.2 (Swagger/OpenAPI)

## 📁 Project Structure

```
Project2/
├── frontend/
│   ├── src/app/
│   │   ├── pages/
│   │   │   ├── bugs/              # Bug list and management
│   │   │   ├── dashboard/         # Main dashboard
│   │   │   ├── login/             # User authentication
│   │   │   ├── register/          # User registration
│   │   │   └── new-bug/           # Create/Edit bug form
│   │   ├── services/
│   │   │   ├── authservice.ts     # Authentication service
│   │   │   └── bugservice.ts      # Bug management service
│   │   ├── guards/
│   │   │   ├── auth.guard.ts      # Route protection
│   │   │   └── role.guard.ts      # Role-based access
│   │   └── interceptors/
│   │       └── interceptor.ts     # HTTP request interceptor
│   └── package.json
└── backend/
    ├── BugTracker.API/            # Web API controllers
    │   ├── Controllers/
    │   │   ├── AuthController.cs  # Authentication endpoints
    │   │   ├── BugController.cs   # Bug CRUD operations
    │   │   ├── ProjectController.cs
    │   │   └── UserController.cs
    │   └── Program.cs             # Application configuration
    ├── Core/                      # Domain entities and interfaces
    │   ├── Entities/
    │   │   ├── Bug.cs
    │   │   ├── User.cs
    │   │   └── Project.cs
    │   ├── Interfaces/            # Repository interfaces
    │   └── DTOs/                  # Data transfer objects
    ├── Infrastructure/            # Data access layer
    │   ├── Data/
    │   │   └── BugTrackerContext.cs
    │   ├── Repositories/          # Repository implementations
    │   └── Migrations/            # EF Core migrations
    ├── Application/               # Business logic services
    │   └── Services/
    └── BugTrackerTest/           # Unit tests
```

## 🔧 Setup Instructions

### Prerequisites
- **Node.js**: 18.x or higher
- **Angular CLI**: 20.x
- **.NET SDK**: 8.0
- **SQL Server**: LocalDB or SQL Server instance

### Backend Setup

1. **Navigate to API project**
   ```bash
   cd backend/BugTracker.API
   ```

2. **Update connection string** in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=BugTrackerDB;Trusted_Connection=true;TrustServerCertificate=true"
     }
   }
   ```

3. **Install dependencies and run migrations**:
   ```bash
   dotnet restore
   dotnet ef database update
   ```

4. **Start the API**:
   ```bash
   dotnet run
   ```
   API will be available at `https://localhost:7028`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```
   Application will be available at `http://localhost:4200`

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full CRUD access, can delete bugs and manage users
- **Developer**: Can create and update bugs, view all bugs
- **Tester**: Can create bugs and view assigned bugs

### Default Credentials
The system seeds with default users:
- **Admin**: `admin@example.com` / `Admin123!`
- **Developer**: `dev@example.com` / `Dev123!`
- **Tester**: `test@example.com` / `Test123!`

### JWT Configuration
```json
{
  "JWT": {
    "Key": "MyVeryStrongJWTSecretKey1234567890!",
    "Issuer": "BugTrackerAPI",
    "Audience": "BugTrackerUsers"
  }
}
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Bug Management
- `GET /api/Bug` - Get all bugs
- `GET /api/Bug/{id}` - Get bug by ID
- `POST /api/Bug` - Create new bug
- `PUT /api/Bug/{id}` - Update bug
- `DELETE /api/Bug/{id}` - Delete bug (Admin only)
- `PATCH /api/Bug/{id}/assign` - Assign bug to user

### Projects & Users
- `GET /api/Project` - Get all projects
- `GET /api/User` - Get all users

## 🎨 UI Features

### Bug Management Interface
- **Data Table**: Sortable columns with pagination
- **Advanced Filtering**: Real-time search and filter options
- **Status Tags**: Color-coded status and priority indicators
- **Action Buttons**: Edit and delete operations based on user role
- **Responsive Design**: Mobile-friendly layout

### Form Features
- **Dual-Mode Form**: Single component for create/edit operations
- **Validation**: Required field validation with visual feedback
- **Dropdown Selections**: Project and priority selection
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages

### Theme & Styling
- **Dark Theme**: Professional dark color scheme
- **PrimeNG Components**: Modern UI components with consistent styling
- **Responsive Grid**: Flexible layout for different screen sizes
- **Custom CSS**: Tailored styling for optimal user experience

## 🧪 Testing

### Backend Tests
```bash
cd backend/BugTrackerTest
dotnet test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Production Deployment

### Frontend Build
```bash
cd frontend
npm run build
```
Build artifacts will be in `dist/` directory.

### Backend Publish
```bash
cd backend/BugTracker.API
dotnet publish -c Release -o ./publish
```

### Environment Configuration
Update `appsettings.Production.json` with production settings:
- Database connection string
- JWT secret key
- CORS origins
- Logging configuration

## 🔍 Development Features

### Code Quality
- **TypeScript**: Strong typing throughout the application
- **Clean Architecture**: Separation of concerns in backend
- **Service Layer**: Centralized business logic
- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: Loose coupling between components

### Security Features
- **JWT Tokens**: Secure authentication mechanism
- **Role-Based Access**: Granular permission control
- **Input Validation**: Both client and server-side validation
- **CORS Configuration**: Secure cross-origin requests
- **Exception Handling**: Secure error responses

### Performance Optimizations
- **Lazy Loading**: Route-based code splitting
- **HTTP Interceptors**: Automatic token attachment
- **Caching**: Browser caching for static assets
- **Database Indexing**: Optimized database queries

## 📊 Database Schema

### Core Entities
```sql
Users (Id, Username, PasswordHash, Role)
Projects (Id, Name, Description)
Bugs (Id, Title, Description, Status, Priority, CreatedOn, ProjectId, AssignedToUserId)
```

### Relationships
- Bug → Project (Many-to-One)
- Bug → User (Many-to-One, optional assignment)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Create Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for `http://localhost:4200`
2. **Database Connection**: Verify SQL Server is running and connection string is correct
3. **JWT Errors**: Check JWT configuration in `appsettings.json`
4. **Port Conflicts**: Ensure ports 4200 (frontend) and 7028 (backend) are available

### Support
For issues and questions, please create an issue in the repository or contact the development team.