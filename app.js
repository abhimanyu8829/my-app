const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>CI/CD Test</title>
        <style>
          body {
            background-color: #111;
            color: #00ffcc;
            font-family: Arial, sans-serif;
            text-align: center;
            padding-top: 100px;
          }
          h1 {
            font-size: 40px;
          }
          p {
            font-size: 20px;
            color: #fff;
          }
          .box {
            background: #222;
            padding: 30px;
            border-radius: 10px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>🚀hii here is yash dave how are you </h1>
          <p>This version was deployed via GitHub Actions CI/CD</p>
          <p>Server Time: ${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
