# Enterprise Employee Management System

Enterprise Employee Management System (EEMS) is a full-stack microservice-style application for managing employees, departments, designations, roles, and authentication.

## Project Structure

```text
Enterprise-Employee-Management-System/
├── backend/
│   ├── pom.xml                  # Aggregator for active backend modules
│   ├── auth-service/            # JWT-based login service
│   ├── employee-service/        # Employee CRUD + pagination + search
│   ├── department-service/      # Department CRUD + pagination + search
│   ├── designation-service/     # Designation CRUD + pagination + search
│   └── role-service/            # Role CRUD + pagination (standalone module)
└── frontend/                    # React + Vite + Redux Toolkit UI
```

## Tech Stack

### Frontend
- React 19 + Vite
- Redux Toolkit
- Ant Design + Bootstrap
- Axios
- React Router

### Backend
- Java 21
- Spring Boot 4.1.0
- Spring Web MVC, Spring Data JPA, Spring Security
- H2 Database
- Maven

## Core Features

- JWT authentication (login endpoint + token-based protected routes)
- Employee management (create, update, delete, list, paginated list)
- Department management
- Designation management
- Role management
- Dashboard UI with summary widgets/charts
- Default seed data for authentication, employees, and designations

## Services and Ports

| Service | Port | Base Path |
|---|---:|---|
| auth-service | 8082 | `/api/v1/auth` |
| employee-service | 8081 | `/api/v1/employees` |
| designation-service | 8083 | `/api/v1/designations` |
| department-service | 8084 | `/api/v1/departments` |
| role-service | 8085 | `/api/v1/roles` |
| frontend (Vite dev server) | 5173 (default) | `http://localhost:5173` |

## Default Login

The auth service seeds a default admin user on first startup:

- **Username:** `admin`
- **Password:** `admin123`

## Prerequisites

- Java 21
- Maven 3.9+
- Node.js 20+ and npm

## Getting Started

### 1) Start backend services

From the repository root:

```bash
# Auth service
cd /home/runner/work/Enterprise-Employee-Management-System/Enterprise-Employee-Management-System/backend/auth-service
mvn spring-boot:run

# Employee service
cd /home/runner/work/Enterprise-Employee-Management-System/Enterprise-Employee-Management-System/backend/employee-service
mvn spring-boot:run

# Designation service
cd /home/runner/work/Enterprise-Employee-Management-System/Enterprise-Employee-Management-System/backend/designation-service
mvn spring-boot:run

# Department service
cd /home/runner/work/Enterprise-Employee-Management-System/Enterprise-Employee-Management-System/backend/department-service
mvn spring-boot:run

# Role service (standalone module)
cd /home/runner/work/Enterprise-Employee-Management-System/Enterprise-Employee-Management-System/backend/role-service
mvn spring-boot:run
```

> Note: The backend modules target Java 21 (`maven.compiler.release=21`).

### 2) Start frontend

```bash
cd /home/runner/work/Enterprise-Employee-Management-System/Enterprise-Employee-Management-System/frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

## Frontend Scripts

```bash
npm run dev     # Run development server
npm run build   # Build production assets
npm run lint    # Run ESLint
npm run preview # Preview built app
```

## Validation Status (Current Repository State)

The following baseline checks were executed:

- `backend: mvn test` ❌ fails in this environment because Java 21 is required (`release version 21 not supported`)
- `frontend: npm run lint` ❌ currently reports pre-existing ESLint errors in:
  - `src/main.jsx`
  - `src/pages/Employee/EmployeeList.jsx`

These issues are pre-existing and unrelated to this documentation update.

## API Notes

- The frontend service configuration is in:
  - `/home/runner/work/Enterprise-Employee-Management-System/Enterprise-Employee-Management-System/frontend/src/config/apiConfig.js`
- By default, the frontend calls local services on ports `8081`-`8085`.

## Security and Configuration

- JWT and database settings are configured in each backend service's `application.properties` or `application.yml`.
- For production, move sensitive settings (for example JWT secrets) to environment variables or externalized configuration.

## License

No license file is currently present in this repository.
