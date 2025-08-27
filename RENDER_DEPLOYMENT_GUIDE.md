# Complete Render Deployment Guide

## 🎯 Overview
This guide walks you through deploying your JobPortal application on Render with separate frontend and backend services.

## 📋 Pre-Deployment Checklist

### ✅ Required Accounts
- [ ] GitHub account (to store your code)
- [ ] Render account (free at render.com)
- [ ] Database provider account (Neon, Aiven, or Render PostgreSQL)

### ✅ Project Structure Verification
Make sure your project has this structure:
```
your-project/
├── frontend/          # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Express backend
│   ├── server/
│   ├── package.json
│   └── drizzle.config.ts
└── README.md
```

## 🌐 Step-by-Step Deployment

### Step 1: Upload to GitHub
1. **Create Repository**
   - Go to GitHub and create a new repository
   - Name it something like `jobportal-fullstack`
   - Make it public or private (your choice)

2. **Upload Code**
   - Download your project as ZIP
   - Extract and upload all files to GitHub
   - OR use Git commands if familiar

### Step 2: Set Up Database (Choose One)

#### Option A: Neon Database (Recommended - Free tier)
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create new project: "JobPortal Database"
4. Copy the connection string (looks like: `postgresql://user:pass@host/db`)

#### Option B: Render PostgreSQL
1. In Render dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Name: `jobportal-db`
4. Plan: Free tier
5. Copy connection string after creation

### Step 3: Deploy Backend API

1. **Create Web Service**
   - Go to [render.com](https://render.com) dashboard
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub account
   - Select your repository

2. **Configure Backend Service**
   ```
   Name: jobportal-backend
   Environment: Node
   Region: Choose closest to you
   Branch: main (or master)
   Root Directory: (leave empty)
   Build Command: cd backend && npm install && npm run build
   Start Command: cd backend && npm start
   ```

3. **Add Environment Variables**
   Click **"Advanced"** → **"Add Environment Variable"**
   ```
   DATABASE_URL = your_database_connection_string
   NODE_ENV = production
   FRONTEND_URL = https://jobportal-frontend.onrender.com
   ```

4. **Deploy**
   - Click **"Create Web Service"**
   - Wait 5-10 minutes for deployment
   - Note your backend URL (will be like: `https://jobportal-backend.onrender.com`)

### Step 4: Deploy Frontend

1. **Create Static Site**
   - Click **"New +"** → **"Static Site"**
   - Select the same repository

2. **Configure Frontend Service**
   ```
   Name: jobportal-frontend
   Branch: main (or master)
   Root Directory: (leave empty)
   Build Command: cd frontend && npm install && npm run build
   Publish Directory: frontend/dist
   ```

3. **Add Environment Variables**
   ```
   VITE_API_URL = https://jobportal-backend.onrender.com
   ```
   (Use the actual backend URL from Step 3)

4. **Deploy**
   - Click **"Create Static Site"**
   - Wait 3-5 minutes for deployment

### Step 5: Update CORS Configuration

1. **Update Backend Environment**
   - Go to your backend service settings
   - Update environment variables:
   ```
   FRONTEND_URL = https://your-actual-frontend-url.onrender.com
   ```

2. **Trigger Redeploy**
   - In backend service, click **"Manual Deploy"** → **"Deploy Latest Commit"**

## 🔧 Configuration Fields Reference

### Backend Service Configuration
| Field | Value |
|-------|--------|
| **Service Type** | Web Service |
| **Environment** | Node |
| **Build Command** | `cd backend && npm install && npm run build` |
| **Start Command** | `cd backend && npm start` |
| **Auto-Deploy** | Yes |

### Frontend Service Configuration
| Field | Value |
|-------|--------|
| **Service Type** | Static Site |
| **Build Command** | `cd frontend && npm install && npm run build` |
| **Publish Directory** | `frontend/dist` |
| **Auto-Deploy** | Yes |

### Required Environment Variables

#### Backend Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NODE_ENV` | Environment mode | `production` |
| `FRONTEND_URL` | Your frontend URL (for CORS) | `https://jobportal-frontend.onrender.com` |

#### Frontend Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Your backend API URL | `https://jobportal-backend.onrender.com` |

## 🚨 Common Issues & Solutions

### Issue: "Build Failed"
**Solution**: Check build logs and ensure:
- Package.json exists in both frontend/ and backend/
- Build commands are correct
- Dependencies are properly listed

### Issue: "API Calls Failing"
**Solution**: 
1. Check if VITE_API_URL is set correctly
2. Verify CORS settings in backend
3. Check if backend is running (visit backend URL)

### Issue: "Database Connection Error"
**Solution**:
1. Verify DATABASE_URL format
2. Check database is running
3. Ensure IP whitelist includes 0.0.0.0/0 (for Render)

### Issue: "Blank Page"
**Solution**:
1. Check browser console for errors
2. Verify build completed successfully
3. Check if assets are loading properly

## 🔍 Testing Deployment

1. **Backend Health Check**
   - Visit: `https://your-backend.onrender.com/api/health`
   - Should return: `{"status":"ok","timestamp":"...","service":"JobPortal Backend API"}`

2. **Frontend Loading**
   - Visit your frontend URL
   - Check if site loads completely
   - Test login/signup functionality

3. **Database Connection**
   - Try registering a new user
   - Check if data is saved properly

## 🔄 Updates & Maintenance

### Updating Your Application
1. Make changes to your code
2. Push changes to GitHub
3. Render will automatically redeploy (if auto-deploy is enabled)

### Manual Redeploy
1. Go to service dashboard
2. Click **"Manual Deploy"**
3. Select **"Deploy Latest Commit"**

### Monitoring
- Check service logs in Render dashboard
- Monitor performance and uptime
- Set up alerts for failures

## 💡 Tips for Free Tier Usage

1. **Keep Services Active**
   - Free tier services spin down after 15 minutes of inactivity
   - First request after spin-down may take 30+ seconds

2. **Resource Limits**
   - 512MB RAM limit
   - 400 build minutes per month
   - Consider paid plan for production use

3. **Database Connections**
   - Free databases have connection limits
   - Use connection pooling for better performance

## 🎉 Success!
If everything is working:
- ✅ Backend API responds at `/api/health`
- ✅ Frontend loads without errors
- ✅ Users can register and login
- ✅ Data is saved to database

Your JobPortal is now live and accessible worldwide! 🌍