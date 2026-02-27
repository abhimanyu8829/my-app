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
      <title>CI/CD Deployment 🌟</title>
      <style>
        /* full‑screen animated gradient */
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #f0f0f5;
          background: linear-gradient(120deg, #091236, #1E215D);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        @keyframes gradientBG {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }

        .card {
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.4);
          padding: 40px 60px;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
          max-width: 480px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.2);
        }

        h1 {
          margin-bottom: 15px;
          font-size: 2.4rem;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }

        p {
          margin: 8px 0;
          font-size: 1.1rem;
        }

        .footer {
          margin-top: 20px;
          font-size: 0.85rem;
          color: #bbbbcc;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Deployment Successful</h1>
        <p>Hello <strong>Abhimanyu Bhardwaj</strong></p>
        <p>🕒 Server Time: <em>${new Date().toLocaleString()}</em></p>
        <p>🌍 Environment: <em>${process.env.NODE_ENV || "development"}</em></p>
        <div class="footer">Powered by Express &amp; Node.js</div>
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
