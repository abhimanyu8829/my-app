app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <title>CI/CD Deployment</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow: hidden;
        }

        .card {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          padding: 50px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 0 40px rgba(0, 255, 200, 0.6);
          animation: fadeIn 1.5s ease-in-out;
        }

        h1 {
          font-size: 42px;
          background: linear-gradient(90deg, #00ffcc, #00ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }

        p {
          font-size: 18px;
          color: #ffffff;
          margin: 10px 0;
        }

        .badge {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          border-radius: 30px;
          background: #00ffcc;
          color: #000;
          font-weight: bold;
          animation: pulse 2s infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 5px #00ffcc; }
          50% { box-shadow: 0 0 25px #00ffcc; }
          100% { box-shadow: 0 0 5px #00ffcc; }
        }

        .footer {
          margin-top: 25px;
          font-size: 14px;
          color: #aaa;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Deployment Successful</h1>
        <p>Hello Yash Dave 👋</p>
        <p>This build was deployed via <strong>GitHub Actions CI/CD</strong></p>
        <p>🕒 Server Time: ${new Date().toLocaleString()}</p>
        <div class="badge">DevOps Mode: ACTIVE</div>
        <div class="footer">Powered by Node.js + Express + CI/CD Pipeline</div>
      </div>
    </body>
  </html>
  `);
});



const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
