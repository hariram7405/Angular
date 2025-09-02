# BugTracker Frontend

A modern Angular application for bug tracking and project management with user authentication and role-based access control.

## 🚀 Features

- **User Authentication**: Login/Register with JWT token-based authentication
- **Role-Based Access**: Admin, Developer, and Tester roles with different permissions
- **Bug Management**: Create, view, update, and delete bugs
- **Dashboard**: Overview of bugs and project statistics
- **Responsive Design**: Built with PrimeNG for modern UI components
- **Route Guards**: Protected routes based on authentication status

## 🛠️ Tech Stack

- **Angular 20.2.0** - Frontend framework
- **PrimeNG 17.18.15** - UI component library
- **PrimeIcons 7.0.0** - Icon library
- **RxJS 7.8.0** - Reactive programming
- **TypeScript 5.9.2** - Type-safe JavaScript

## 📁 Project Structure

```
src/
├── app/
│   ├── guards/          # Route guards for authentication
│   ├── interceptors/    # HTTP interceptors
│   ├── pages/           # Application pages
│   │   ├── bugs/        # Bug management page
│   │   ├── dashboard/   # Dashboard page
│   │   ├── login/       # Login page
│   │   └── register/    # Registration page
│   ├── services/        # Angular services
│   ├── app.config.ts    # App configuration
│   ├── app.routes.ts    # Route definitions
│   └── app.ts           # Root component
├── index.html           # Main HTML file
├── main.ts             # Application bootstrap
└── styles.css          # Global styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v20.2.0)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 4200 |
| `npm run build` | Build the project for production |
| `npm run watch` | Build and watch for changes |
| `npm test` | Run unit tests with Karma |
| `ng serve` | Alternative to npm start |

## 🔐 Authentication

The application uses JWT token-based authentication:

1. **Register**: Create a new account with username, password, and role
2. **Login**: Authenticate with username and password
3. **Token Storage**: JWT tokens are stored securely
4. **Auto-logout**: Tokens expire after 1 hour

### User Roles

- **Admin**: Full access to all features
- **Developer**: Can create and manage bugs
- **Tester**: Can view and test bugs

## 🌐 API Integration

The frontend connects to the BugTracker API backend:

- **Base URL**: `http://localhost:5270/api`
- **Authentication**: JWT Bearer tokens
- **CORS**: Configured for localhost:4200

### API Endpoints Used

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/users` - Get all users (admin only)
- `GET /bugs` - Get all bugs
- `POST /bugs` - Create new bug
- `PUT /bugs/{id}` - Update bug
- `DELETE /bugs/{id}` - Delete bug

## 🎨 UI Components

Built with PrimeNG components:

- **Forms**: Input fields, buttons, dropdowns
- **Tables**: Data display with sorting and filtering
- **Navigation**: Menu bars and breadcrumbs
- **Feedback**: Toast messages and dialogs
- **Layout**: Cards, panels, and grids

## 🔒 Security Features

- **Route Guards**: Prevent unauthorized access
- **HTTP Interceptors**: Automatic token attachment
- **Input Validation**: Client-side form validation
- **XSS Protection**: Angular's built-in sanitization
- **CSRF Protection**: Token-based authentication

## 🚀 Deployment

### Development Build
```bash
npm run build
```

### Production Build
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
ng test --watch
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Configuration

### Environment Variables

Create environment files for different configurations:

- `src/environments/environment.ts` - Development
- `src/environments/environment.prod.ts` - Production

### API Configuration

Update the API base URL in your service files to match your backend:

```typescript
private apiUrl = 'http://localhost:5270/api';
```

## 📝 Code Style

The project uses Prettier for code formatting:

- **Print Width**: 100 characters
- **Single Quotes**: Enabled
- **Angular Parser**: For HTML templates

Format code:
```bash
npx prettier --write src/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Port 4200 already in use**
   ```bash
   ng serve --port 4201
   ```

2. **API connection issues**
   - Ensure backend is running on port 5270
   - Check CORS configuration
   - Verify API endpoints

3. **Authentication problems**
   - Clear browser storage
   - Check token expiration
   - Verify JWT configuration

### Getting Help

- Check the console for error messages
- Review network tab for API calls
- Ensure all dependencies are installed
- Verify Angular CLI version compatibility

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Coding! 🎉**