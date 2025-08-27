# JobPortal Backend

Express.js backend API for the JobPortal platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Push database schema
npm run db:push
```

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Database connection string
DATABASE_URL=postgresql://user:password@host:port/database

# Frontend URL (for CORS)
FRONTEND_URL=https://jobportal-frontend.onrender.com

# Port configuration
PORT=10000

# Environment
NODE_ENV=production
```

## 📁 Project Structure

```
server/
├── index.ts          # Main server entry point
├── routes.ts         # API route definitions
├── db.ts            # Database connection and schema
└── storage.ts       # Data access layer
shared/
└── schema.ts        # Shared TypeScript types
```

## 🛠️ Technologies Used

- Express.js with TypeScript
- Drizzle ORM for database operations
- PostgreSQL database
- Zod for validation
- Bcryptjs for password hashing

## 🔗 API Endpoints

### Health Check
- `GET /api/health` - Server health status
- `GET /` - API information

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job

### Applications
- `GET /api/applications` - Get user applications
- `POST /api/applications` - Apply for job

### Other
- Jobs, Courses, Companies, Contacts endpoints available