# JobPortal Frontend

React.js frontend application for the JobPortal platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Production backend URL
VITE_API_URL=https://jobportal-backend.onrender.com

# For local development, leave empty or use:
# VITE_API_URL=http://localhost:10000
```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   └── ui/           # Shadcn/ui components
├── pages/            # Page components
├── lib/              # Utility functions and configurations
├── hooks/            # Custom React hooks
└── index.css         # Global styles
```

## 🛠️ Technologies Used

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn/ui component library
- TanStack Query for data fetching
- Wouter for routing
- React Hook Form with Zod validation