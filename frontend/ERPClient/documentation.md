# ERP System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Role-Based Access Control](#role-based-access-control)
4. [Modules](#modules)
5. [API Endpoints](#api-endpoints)
6. [Frontend Structure](#frontend-structure)
7. [State Management](#state-management)
8. [Employee Management](#employee-management)

## Overview
This ERP system is a role-based application with different access levels for different user roles:
- Super Admin
- Admin
- Manager
- Cashier

## Authentication

### Login Flow
1. User enters email and password
2. API validates credentials
3. On success:
   - JWT token is returned
   - User data is returned
   - Both are stored in localStorage
4. User is redirected to dashboard

### Registration Flow
1. User fills registration form
2. API validates data
3. On success:
   - User is created with 'Cashier' role
   - User is redirected to login

## Role-Based Access Control

### Role Permissions
1. **Super Admin**
   - Full access to all modules
   - Company Registration
   - Permission Management
   - Sales
   - Inventory
   - Customers
   - Analytics

2. **Admin**
   - Sales
   - Inventory
   - Customers
   - Analytics

3. **Manager**
   - Sales
   - Inventory
   - Customers

4. **Cashier**
   - POS
   - Basic Sales

## Modules

### 1. Authentication Module
- Login
- Registration
- Password Reset (TODO)

### 2. Company Management (Super Admin)
- Company Registration
- Company Settings
- Branch Management

### 3. User Management (Super Admin)
- User Registration
- Role Assignment
- Permission Management

### 4. Sales Module
- Sales Dashboard
- Sales History
- Sales Reports
- Basic Sales (Cashier)

### 5. Inventory Module
- Stock Management
- Product Management
- Stock Reports
- Low Stock Alerts

### 6. Customer Module
- Customer Management
- Customer History
- Customer Reports

### 7. Analytics Module
- Sales Analytics
- Inventory Analytics
- Customer Analytics
- Financial Reports

### 8. POS Module (Cashier)
- Point of Sale
- Quick Sales
- Receipt Generation

## API Endpoints

### Authentication
```
POST /api/auth/register
- Body: {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    dateOfBirth: string
  }
- Response: { message: string, user: User }

POST /api/auth/login
- Body: {
    email: string,
    password: string
  }
- Response: { token: string, user: User }
```

### Company Management
```
POST /api/company/register
- Body: {
    name: string,
    address: string,
    contact: string,
    email: string
  }
- Response: { company: Company }

GET /api/company/:id
- Response: { company: Company }

PUT /api/company/:id
- Body: { company: Company }
- Response: { company: Company }
```

### User Management
```
GET /api/users
- Response: { users: User[] }

POST /api/users
- Body: { user: User }
- Response: { user: User }

PUT /api/users/:id
- Body: { user: User }
- Response: { user: User }

DELETE /api/users/:id
- Response: { message: string }
```

### Sales
```
GET /api/sales
- Response: { sales: Sale[] }

POST /api/sales
- Body: { sale: Sale }
- Response: { sale: Sale }

GET /api/sales/:id
- Response: { sale: Sale }

GET /api/sales/reports
- Response: { reports: Report[] }
```

### Inventory
```
GET /api/inventory
- Response: { items: InventoryItem[] }

POST /api/inventory
- Body: { item: InventoryItem }
- Response: { item: InventoryItem }

PUT /api/inventory/:id
- Body: { item: InventoryItem }
- Response: { item: InventoryItem }

GET /api/inventory/reports
- Response: { reports: Report[] }
```

### Customers
```
GET /api/customers
- Response: { customers: Customer[] }

POST /api/customers
- Body: { customer: Customer }
- Response: { customer: Customer }

PUT /api/customers/:id
- Body: { customer: Customer }
- Response: { customer: Customer }

GET /api/customers/:id/history
- Response: { history: History[] }
```

## Frontend Structure

```
src/
├── api/                 # API service functions
├── components/          # Reusable components
│   ├── ProtectedRoute.tsx
│   └── PublicRoute.tsx
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── dashboard/      # Dashboard and modules
│   │   └── Dashboard.tsx
│   └── NotFound.tsx    # 404 page
└── App.tsx             # Main application component
```

## State Management
- Using localStorage for:
  - JWT token storage
  - User data storage
- No global state management (Redux/Context) needed for current scope
- Can be added later for complex state requirements

## Future Enhancements
1. Implement password reset functionality
2. Add email verification
3. Add two-factor authentication
4. Implement real-time notifications
5. Add data export functionality
6. Implement audit logging
7. Add role-based API access control
8. Implement file upload for inventory images
9. Add barcode scanning for POS
10. Implement receipt printing 

## Employee Management

### Role Promotion System
1. **Initial Registration**
   - All users register as Cashiers
   - Basic access to POS and basic sales
   - Requires promotion for higher roles

2. **Role Promotion (Super Admin Only)**
   - View all employees
   - Promote employees to higher roles
   - Track promotion history
   - Revoke promotions if needed

### API Endpoints
```
GET /api/employees
- Response: { employees: Employee[] }
- Access: Super Admin only

PUT /api/employees/:id/promote
- Body: {
    newRole: string,
    reason: string
  }
- Response: { employee: Employee, promotionHistory: PromotionHistory }
- Access: Super Admin only

GET /api/employees/:id/promotion-history
- Response: { promotions: PromotionHistory[] }
- Access: Super Admin only
```

### Promotion Flow
1. Super Admin views employee list
2. Selects employee to promote
3. Chooses new role (Admin/Manager)
4. Provides reason for promotion
5. System updates role and logs promotion
6. Employee gets new permissions on next login

### Security Considerations
- All role changes are logged
- Only Super Admin can promote
- Promotions require reason documentation
- Role changes take effect on next login
- Previous role history is maintained 