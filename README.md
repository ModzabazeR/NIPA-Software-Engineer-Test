# Ticket Management System

## Project Overview
A ticket management system built with Next.js and Hono.js, designed to handle support tickets efficiently. The system allows users to create, track, and manage tickets with user-friendly interface.

The system is designed with a single user role: Admin. Administrators are responsible for entering ticket details on behalf of customers and have full visibility of all tickets in the system. Any admin can view, update, and manage tickets to provide efficient customer support.

## Features and Specifications

### Core Features
- User authentication system
- Ticket creation and management
- Responsive design for all devices

### Tech Stack
- **Frontend:**
  - Next.js 15.2
  - React 19
  - TypeScript
  - Tailwind CSS
  - shadcn/ui for components
  - Axios for API calls

- **Backend:**
  - Hono.js
  - Node.js
  - TypeScript
  - Prisma ORM
  - PostgreSQL
  - JWT Authentication
  - OpenAPI and Scalar for API documentation

## Project Structure
```
NIPA-Software-Engineer-Test/
│
├── nipa-frontend/       # Next.js frontend application
│   ├── app/             # Next.js app directory
│   ├── components/      # Reusable components
│   │   └── ui/          # shadcn/ui components
│   └── lib/             # Utility functions and configurations
│       └── api/         # API calls
│
├── nipa-backend/   # Hono.js backend application
│ ├── src/          # Source code
│ │ ├── routes/     # API routes
│ │ ├── config/     # Backend configurations
│ │ ├── docs/       # OpenAPI documentation
│ │ ├── schema/     # Zod schemas
│ │ ├── middleware/ # Custom middleware
│ │ └── index.ts    # Entry point for the backend
│ └── prisma/       # Database schema and migrations
│
└── compose.yml     # Docker compose configuration
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Environment Setup
1. Clone the repository
```bash
git clone https://github.com/ModzabazeR/NIPA-Software-Engineer-Test.git
cd NIPA-Software-Engineer-Test
```

2. Create `.env` file in the root directory:
```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name
POSTGRES_PORT=5432
JWT_SECRET=your_jwt_secret
```

### Installation and Running

#### Using Docker (Production)
```bash
docker compose up -d
```

#### Manual Setup (Development)
Create `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_db_name?schema=public
JWT_SECRET=your_jwt_secret
```

Run the following commands in the root directory to install dependencies and start the application (assuming PostgreSQL is already running):

```bash
npm run install:all
npm run dev
```

## How to Access

After starting the application:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8787
- API Documentation: http://localhost:8787/docs
- Database: localhost:5432

## Usage Examples

### Ticket Management Flow
1. Login to the system
2. Navigate to the ticket board
3. Create a new ticket using the "Create Ticket" button
4. Fill in the required information:
   - Title
   - Description
   - Contact Information
5. Track ticket status (pending, accepted, resolved, rejected)
6. Try updating the ticket status to see the status changes

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL is running
   - Verify database credentials in .env file
   - Check if database port is not in use

2. **Frontend API Connection Issues**
   - Verify backend is running on port 8787
   - Check CORS settings if making local modifications
   - Ensure axios baseURL is correctly configured

3. **Docker Issues**
   - Ensure no services are running on ports 3000, 8787, or 5432
   - Try removing existing containers and volumes:
     ```bash
     docker compose down -v
     docker compose up --build
     ```
