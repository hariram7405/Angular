# Bug Tracker Application

A full-stack bug tracking system built with Angular frontend and .NET Core backend.

## Features

### Frontend (Angular)
- **Bug Management**: View, filter, and sort bugs
- **Authentication**: JWT-based login/register system
- **Filtering**: Search by title, status, priority
- **Responsive Design**: Mobile-friendly UI with PrimeNG components
- **Real-time Updates**: Dynamic bug status and priority display

### Backend (.NET Core)
- **RESTful API**: CRUD operations for bugs and projects
- **Authentication**: JWT token-based security
- **Role-based Access**: Admin, Developer, Tester roles
- **Entity Framework**: Database operations with SQL Server
- **Clean Architecture**: Separated concerns with Core, Infrastructure, and API layers

## Tech Stack

**Frontend:**
- Angular 17+
- PrimeNG UI Components
- TypeScript
- RxJS

**Backend:**
- .NET Core 8
- Entity Framework Core
- SQL Server
- JWT Authentication
- Clean Architecture

## Project Structure

```
Project2/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   ├── bugs/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── services/
│   │   │   └── guards/
│   │   └── styles.css
└── backend/
    ├── BugTracker.API/
    ├── BugTracker.Core/
    ├── BugTracker.Infrastructure/
    └── BugTracker.Application/
```

## Setup Instructions

### Backend Setup
1. Navigate to backend directory
2. Update connection string in `appsettings.json`
3. Run migrations: `dotnet ef database update`
4. Start API: `dotnet run`

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Start development server: `ng serve`
4. Open browser to `http://localhost:4200`

## API Endpoints

- `GET /api/Bug` - Get all bugs

## Features Overview

### Bug Filtering
- Global search across all fields
- Filter by title (contains)
- Filter by status (Open, In Progress, Closed)
- Filter by priority (High, Medium, Low)
- Reset all filters

### User Roles
- **Admin**: Full CRUD access
- **Developer**: Create and update bugs
- **Tester**: View and report bugs

### Security
- JWT token authentication
- Role-based authorization
- Protected API endpoints

## Default Credentials
- Admin: admin@example.com / Admin123!
- Developer: dev@example.com / Dev123!
- Tester: test@example.com / Test123!

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request