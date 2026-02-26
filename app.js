require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(morgan("combined")); // Logging
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.status(200).send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CI/CD Deployment</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          text-align: center;
          padding-top: 100px;
        }
        .card {
          background: rgba(255, 255, 255, 0.1);
          padding: 30px;
          border-radius: 15px;
          display: inline-block;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        h1 {
          margin-bottom: 10px;
        }
        p {
          font-size: 18px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Deployment Successful</h1>
        <p>Hello Abhimanyu Bhardwaj</p>
        <p>🕒 Server Time: ${new Date().toLocaleString()}</p>
        <p>🌍 Environment: ${process.env.NODE_ENV || "development"}</p>
      </div>
    </body>
  </html>
  `);
});

// Health Check Route (Important for DevOps)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
  });
});

// Graceful Shutdown (Important for Docker/K8s)
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
