import express, { Request, Response } from "express";
import { registerRoutes } from "./routes.js";

const app = express();

// CORS configuration
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
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

  app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      service: "JobPortal Backend API"
    });
  });

  app.get("/", (req: Request, res: Response) => {
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
