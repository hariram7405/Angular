# Angular Student Portal Assignment

A mini student portal application built with Angular 17 and PrimeNG, featuring student registration, listing, and editing capabilities.

## Features

### 1. Student Registration (/register)
- Reactive form with real-time validation
- Form fields: Name, Email, Age, Department
- Validation rules:
  - Name: Required, minimum 3 characters
  - Email: Required, valid email format
  - Age: Required, between 16-45 years
  - Department: Required, dropdown selection
- Clear error messages for each field
- Responsive design for mobile and desktop

### 2. Student List (/students)
- PrimeNG DataTable displaying all registered students
- Columns: Name, Email, Age, Department
- Click-to-edit functionality with dialog popup
- Edit form with same validation rules as registration
- Responsive table design

### 3. Navigation & Routing
- PrimeNG Menubar for navigation between pages
- Routes: `/register` and `/students`
- Default redirect to registration page

### 4. Responsive UI
- Mobile-first responsive design
- Grid layout on wide screens
- Stacked forms on mobile devices
- PrimeNG Lara Light Blue theme

## Technology Stack

- **Angular 17** - Frontend framework
- **PrimeNG 17** - UI component library
- **PrimeIcons** - Icon library
- **Reactive Forms** - Form handling and validation
- **TypeScript** - Programming language
- **CSS3** - Styling and responsive design

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Angular-StudentPortal-Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install PrimeNG and PrimeIcons** (if not already installed)
   ```bash
   npm install primeng primeicons
   ```

4. **Start the development server**
   ```bash
   ng serve
   ```

5. **Open the application**
   Navigate to `http://localhost:4200` in your browser

### Build for Production
```bash
ng build --prod
```

## Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── register/          # Student registration component
│   │   └── students/          # Student list component
│   ├── services/
│   │   └── student.service.ts # Student data management service
│   ├── app.component.*        # Main app component with navigation
│   ├── app.config.ts         # App configuration
│   └── app.routes.ts         # Routing configuration
├── assets/                   # Static assets
└── styles.css               # Global styles and PrimeNG imports
```

## Key Components

### StudentService
- Manages student data using BehaviorSubject for reactive updates
- Provides methods for adding and updating students
- In-memory storage (can be extended to use backend API)

### RegisterComponent
- Reactive form with comprehensive validation
- Real-time error display
- Automatic navigation to student list after successful registration

### StudentsComponent
- PrimeNG DataTable with pagination
- Edit dialog with form validation
- Responsive table design

## Validation Rules

| Field | Rules |
|-------|-------|
| Name | Required, minimum 3 characters |
| Email | Required, valid email format |
| Age | Required, between 16-45 years |
| Department | Required, dropdown selection |

## Responsive Design

- **Desktop (>768px)**: Full grid layout with sidebar navigation
- **Mobile (≤768px)**: Stacked layout with collapsible navigation
- **Table**: Horizontal scroll on mobile devices
- **Forms**: Full-width inputs with proper spacing

## Screenshots

1. **Registration Page** - Student registration form with validation
2. **Student List** - DataTable showing all registered students
3. **Edit Dialog** - Modal dialog for editing student details
4. **Navigation Menu** - PrimeNG menubar for page navigation
5. **Mobile View** - Responsive design on mobile devices

## Future Enhancements

- Backend API integration
- Student deletion functionality
- Advanced search and filtering
- Export to CSV/PDF
- Student profile pictures
- Bulk operations

## License

This project is created for educational purposes as part of Angular training assessment.