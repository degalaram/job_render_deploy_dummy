# JobPortal - Student & Fresher Job Portal

A comprehensive job portal application designed for students and fresh graduates. Features include user authentication, categorized job listings, course offerings, project showcase, and contact functionality.

## 🏗️ Project Structure

```
jobportal/
├── frontend/          # React.js frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── hooks/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Express.js backend API
│   ├── server/
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   ├── db.ts
│   │   └── storage.ts
│   ├── shared/
│   └── package.json
└── README.md
```

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **TanStack Query** for data fetching
- **Wouter** for routing
- **React Hook Form** with Zod validation

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** database
- **Zod** for API validation
- **Bcryptjs** for password hashing

## 🌐 Deployment on Render

### Prerequisites
1. GitHub account
2. Render account
3. PostgreSQL database (Neon, Aiven, or Render PostgreSQL)

### Step 1: Upload to GitHub
1. Create a new repository on GitHub
2. Upload this entire project folder as a ZIP or clone it
3. Make sure both `frontend/` and `backend/` folders are in the root

### Step 2: Deploy Backend (API)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `jobportal-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Auto-Deploy**: Yes

#### Environment Variables (Backend):
```
DATABASE_URL=your_postgresql_connection_string
FRONTEND_URL=https://jobportal-frontend.onrender.com
NODE_ENV=production
```

### Step 3: Deploy Frontend
1. Click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `jobportal-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Auto-Deploy**: Yes

#### Environment Variables (Frontend):
```
VITE_API_URL=https://jobportal-backend.onrender.com
```

### Step 4: Database Setup
1. Set up a PostgreSQL database (recommended: Neon, Aiven, or Render PostgreSQL)
2. Get your connection string
3. Add it to backend environment variables
4. Your backend will automatically create tables on first run

## 🔧 Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Setup
1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Set up environment variables:
   ```bash
   # In backend/
   cp .env.example .env
   # Add your database URL
   
   # In frontend/
   cp .env.example .env
   # Add backend URL (for production only)
   ```

4. Start development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend && npm run dev
   ```

5. Open http://localhost:5173 in your browser

## 📁 Key Features

- **Job Listings**: Categorized by experience level (Fresher 0-1 years, Experienced 2+ years)
- **User Authentication**: Secure login/signup system
- **Course System**: Educational content with enrollment tracking
- **Company Profiles**: LinkedIn integration and company information
- **Project Showcase**: Curated projects for skill development
- **Contact Forms**: User inquiries and support
- **Responsive Design**: Mobile-first approach
- **Search & Filters**: Advanced filtering options

## 🔒 Security Features

- Password hashing with bcrypt
- Input validation with Zod
- CORS configuration for secure API access
- Environment variable protection
- SQL injection prevention with Drizzle ORM

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.