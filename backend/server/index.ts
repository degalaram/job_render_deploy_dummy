import express from "express";
import { registerRoutes } from "./routes.js";

const app = express();

// CORS configuration for production
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5000',
    process.env.FRONTEND_URL
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  const server = await registerRoutes(app);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      service: "JobPortal Backend API"
    });
  });

  // Root endpoint
  app.get("/", (req, res) => {
    res.json({ 
      message: "JobPortal Backend API", 
      version: "1.0.0",
      status: "running"
    });
  });

  const port = parseInt(process.env.PORT || '10000', 10);
  server.listen(port, '0.0.0.0', () => {
    console.log(`Backend server running on port ${port}`);
  });
})();
