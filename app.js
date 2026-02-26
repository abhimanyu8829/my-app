const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <title>CI/CD Deployment</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <h1>🚀 Deployment Successful</h1>
      <p>Hello Yash Dave 👋</p>
      <p>🕒 Server Time: ${new Date().toLocaleString()}</p>
    </body>
  </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
