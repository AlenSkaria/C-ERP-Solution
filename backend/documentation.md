# ERP System Documentation

## Architecture Overview

This ERP system is currently implemented as a monolithic architecture (MVP) with the following future roadmap:
- Phase 1 (Current): Monolithic Architecture
- Phase 2: Microservices Architecture (planned)
  - User Service
  - Authentication Service
  - Inventory Service
  - Sales Service
  - Reporting Service

## Technology Stack

- **Backend**: Node.js with Express
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Architecture Pattern**: MVC (Model-View-Controller)

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/        # Database models
├── routes/        # API routes
├── services/      # Business logic
├── validations/   # Input validation
└── utils/         # Utility functions
```

## Authentication Flow

1. **Registration Flow**:
   ```
   Client → POST /api/auth/register
   → Validation Middleware
   → Controller
   → Service (Password Hashing)
   → Database
   → Response
   ```

2. **Login Flow**:
   ```
   Client → POST /api/auth/login
   → Validation Middleware
   → Controller
   → Service (Password Verification)
   → JWT Generation
   → Response
   ```

## API Endpoints

### Authentication Routes

#### 1. User Registration
- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user
- **Request Body**:
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "dateOfBirth": "1990-01-01",
    "role": "Cashier"
}
```
- **Validation Rules**:
  - First name: Required
  - Last name: Required
  - Username: Min 3 chars, alphanumeric + underscore
  - Email: Valid email format
  - Password: Min 8 chars, must contain number
  - Date of Birth: Valid date, not in future
  - Role: Must be one of ["Super Admin", "Admin", "Manager", "Cashier"]

#### 2. User Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate user and get JWT token
- **Request Body**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

#### 3. Get User Profile
- **Endpoint**: `GET /api/auth/profile`
- **Description**: Get authenticated user's profile
- **Authentication**: Required (Bearer Token)
- **Headers**: `Authorization: Bearer <token>`

### Admin Routes

#### 1. Get All Users
- **Endpoint**: `GET /api/auth/users`
- **Description**: List all users (Admin only)
- **Authentication**: Required (Bearer Token)
- **Authorization**: Admin role required
- **Headers**: `Authorization: Bearer <token>`

#### 2. Get User by ID
- **Endpoint**: `GET /api/auth/users/:userId`
- **Description**: Get specific user details (Admin only)
- **Authentication**: Required (Bearer Token)
- **Authorization**: Admin role required
- **Headers**: `Authorization: Bearer <token>`

## Error Handling

The system implements consistent error handling across all endpoints:

1. **Validation Errors** (400):
```json
{
    "errors": [
        {
            "msg": "Username must be at least 3 characters long",
            "param": "username",
            "location": "body"
        }
    ]
}
```

2. **Authentication Errors** (401):
```json
{
    "error": "Access token required"
}
```

3. **Authorization Errors** (403):
```json
{
    "error": "Access denied. Admin privileges required."
}
```

4. **Not Found Errors** (404):
```json
{
    "error": "User not found"
}
```

## Security Features

1. **Password Security**:
   - Passwords are hashed using bcrypt
   - Never stored in plain text
   - Minimum length and complexity requirements

2. **JWT Authentication**:
   - Token-based authentication
   - 24-hour expiration
   - Contains user ID, email, and role

3. **Role-Based Access Control**:
   - Super Admin: Full system access
   - Admin: User management access
   - Manager: Limited administrative access
   - Cashier: Basic system access

## Future Enhancements

1. **Microservices Architecture**:
   - Split into independent services
   - Service-to-service communication
   - Independent scaling
   - Technology flexibility per service

2. **Additional Features**:
   - Password reset functionality
   - Email verification
   - Two-factor authentication
   - Session management
   - Rate limiting
   - API documentation with Swagger/OpenAPI

3. **Monitoring and Logging**:
   - Centralized logging
   - Performance monitoring
   - Error tracking
   - Usage analytics

## Development Guidelines

1. **Code Style**:
   - TypeScript strict mode
   - ESLint configuration
   - Prettier formatting

2. **Testing**:
   - Unit tests for services
   - Integration tests for API endpoints
   - Test coverage requirements

3. **Documentation**:
   - Code comments
   - API documentation
   - Architecture diagrams

## Getting Started

1. **Prerequisites**:
   - Node.js (v14 or higher)
   - MongoDB
   - npm or yarn

2. **Installation**:
```bash
npm install
```

3. **Environment Setup**:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/erp
JWT_SECRET=your-secret-key
```

4. **Running the Application**:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the MIT License. 