# CL | ERP

A specialized Enterprise Resource Planning (ERP) solution designed for clothing retail businesses. This MVP (Minimum Viable Product) provides essential features for managing a clothing retail operation with a modern tech stack featuring a Node.js backend and React frontend.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Documentation](#api-documentation)
- [Design Decisions & Challenges](#design-decisions--challenges)

## Overview
CL | ERP streamlines clothing retail operations by integrating inventory management, sales processing, and employee management into a unified system. This MVP version focuses on core functionalities essential for clothing retail businesses while maintaining scalability for future enhancements.

## Features
### Core Features (MVP)
- **Inventory Management**
  - Clothing item categorization (Men's, Women's)
  - Stock monitoring

- **Sales Management**
  - Point of Sale (POS) system
  - Sales history
  - Sales reports

- **Customer Management**
  - Customer profiles
  - Purchase history

- **Employee Management**
  - Role-based access control
  - Sales performance tracking


### Analytics & Reporting
- **Sales Analytics**
  - Sales trends
  - Top-selling products
  - Revenue by category

- **Inventory Reports**
  - Stock 
  - Product
  - Category-wise 

## Live Application
- Frontend: [https://c-erp-solution-1.onrender.com](https://c-erp-solution-1.onrender.com)


### Future Enhancements (Post-MVP)
- Advanced inventory forecasting
- Advanced customer analytics
- Supplier management portal
- Seasonal trend analysis

## Tech Stack
### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Docker

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

## Project Structure
```
ERPsolutions/
├── backend/              # Node.js + Express backend
│   ├── src/             # Source code
│   ├── dist/            # Compiled TypeScript
│   └── documentation.md # Detailed backend documentation
├── frontend/
│   └── ERPClient/       # React frontend application
└── docs/                # Additional documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB
- Docker (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AlenSkaria/C-ERP-Solution.git
cd ERPsolutions
```

2. **Backend Setup**
```bash
cd backend
npm install

npm run build
npm run dev  # For development
```

3. **Frontend Setup**
```bash
cd frontend/ERPClient
npm install
npm run dev  # Starts the Vite development server
```


## API Documentation

The complete API documentation is available:

[Postman Collection](./docs/api/projectERP.postman_collection.json)

## Authentication & Role Management

### Role Hierarchy
The system implements a role-based access control with the following hierarchy:
1. **Super Admin**
   - Complete system control
   - Store owner/senior management access
   - Can manage all aspects including role assignments
   - Access to financial reports and sensitive data

2. **Admin**
   - Store manager level access
   - Inventory management
   - Staff management
   - Sales reports access

3. **Manager**
   - Department manager access
   - Stock management
   - Team supervision
   - Basic reports access

4. **Cashier (Default Role)**
   - POS system access
   - Basic inventory checks
   - Customer service functions
   - Sales processing

### Authentication Flow
1. **Registration**
   - New employees register with basic information
   - Automatically assigned 'Cashier' role by default
   - Required fields:
     - First Name
     - Last Name
     - Username (unique)
     - Email (unique)
     - Password (min 8 characters)
     - Date of Birth

2. **Login**
   - Secure employee login using email and password
   - JWT token issued upon successful authentication
   - Role-based access control enforcement

3. **Role Management**
   - Exclusive Super Admin control over role assignments
   - Role changes require documentation
   - Promotion limited to Manager and Admin roles
   - Audit trail for all role modifications

### Access Control
- **Public Routes**
  - Registration
  - Login

- **Protected Routes**
  - All routes require valid JWT token
  - Role-specific access restrictions:
    - `/api/analytics/*` - Manager and above
    - `/api/employees/*` - Super Admin only
    - `/api/products/*` - Manager and above
    - `/api/customers/*` - Cashier and above

### Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Role-based middleware protection
- Session management
- Input validation and sanitization

## Design Decisions & Challenges

### Architecture Decisions
1. **Current Architecture & Future Plans**
   
   #### Current MVP (Monolith)
   - Simple, single application architecture
   - Everything connected in one codebase
   - Single database
   - Easy to develop and test
   
   #### Initial Microservices Plan
   - Will split Analytics first
     - Separate heavy data processing
     - Better performance for reports
   - Then Sales service
     - Handle high traffic operations
     - Core business functions

2. **Technology Choices**
   - Node.js & Express
     - Great for APIs
     - Easy to learn and use
   - React Frontend
     - Modern UI development
     - Great developer tools
   - MongoDB
     - Flexible database
     - Works well with Node.js

### Main Challenges & Solutions
1. **Learning Curve**
   - Challenge: New concepts and patterns
   - Solution: Taking it step by step

