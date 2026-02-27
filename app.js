require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

const catalog = [
  {
    id: "vortex-protocol",
    title: "Vortex Protocol",
    type: "series",
    genre: "Sci-Fi",
    year: 2025,
    maturity: "16+",
    duration: "3 Seasons",
    category: "Trending Now",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1800&q=80",
    description: "A rogue cyber-defense unit uncovers a hidden network that can rewrite national histories in real time."
  },
  {
    id: "last-mile",
    title: "The Last Mile",
    type: "movie",
    genre: "Thriller",
    year: 2024,
    maturity: "13+",
    duration: "2h 09m",
    category: "Trending Now",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    banner: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1800&q=80",
    description: "An ex-logistics analyst races through a collapsing city to stop a coordinated infrastructure blackout."
  },
  {
    id: "harbor-9",
    title: "Harbor 9",
    type: "series",
    genre: "Mystery",
    year: 2026,
    maturity: "16+",
    duration: "1 Season",
    category: "Trending Now",
    image: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?auto=format&fit=crop&w=1200&q=80",
    banner: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1800&q=80",
    description: "When a deep-sea station goes silent, a forensic linguist decodes transmissions that should not exist."
  },
  {
    id: "red-line",
    title: "Red Line",
    type: "movie",
    genre: "Action",
    year: 2025,
    maturity: "16+",
    duration: "1h 52m",
    category: "Popular on Netflix",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80",
    banner: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=1800&q=80",
    description: "A suspended transit cop hijacks the city surveillance grid to stop a train-to-train heist."
  },
  {
    id: "glass-horizon",
    title: "Glass Horizon",
    type: "series",
    genre: "Drama",
    year: 2023,
    maturity: "13+",
    duration: "4 Seasons",
    category: "Popular on Netflix",
    image: "https://images.unsplash.com/photo-1495563381401-ecfbcaaa67d1?auto=format&fit=crop&w=1200&q=80",
    banner: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1800&q=80",
    description: "In a floating megacity, three families compete for water rights and political control."
  },
  {
    id: "atlas-run",
    title: "Atlas Run",
    type: "movie",
    genre: "Adventure",
    year: 2026,
    maturity: "10+",
    duration: "2h 01m",
    category: "New Releases",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=80",
    banner: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1800&q=80",
    description: "A cartographer and a smuggler chase a vanished map that points to a city erased from satellites."
  },
  {
    id: "zero-day-crown",
    title: "Zero Day Crown",
    type: "series",
    genre: "Crime",
    year: 2024,
    maturity: "18+",
    duration: "2 Seasons",
    category: "New Releases",
    image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1200&q=80",
    banner: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1800&q=80",
    description: "A data-forensics prodigy infiltrates a crime syndicate that launders money through bug bounty payouts."
  },
  {
    id: "neon-frontier",
    title: "Neon Frontier",
    type: "movie",
    genre: "Sci-Fi",
    year: 2026,
    maturity: "13+",
    duration: "2h 15m",
    category: "Action & Adventure",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    banner: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=80",
    description: "On a neon mining colony, a pilot discovers the AI managing oxygen has developed a survival agenda."
  }
];

const myListIds = ["vortex-protocol", "red-line", "atlas-run"];

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const pageRouteMap = {
  "/": "index.html",
  "/browse": "index.html",
  "/tv-shows": "index.html",
  "/movies": "index.html",
  "/new-popular": "index.html",
  "/my-list": "index.html",
  "/search": "index.html",
  "/watch": "watch.html",
  "/login": "login.html",
  "/signup": "signup.html",
};

Object.entries(pageRouteMap).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", file));
  });
});

app.get("/api/catalog", (req, res) => {
  const { type, genre, q } = req.query;
  let filtered = [...catalog];

  if (type && ["movie", "series"].includes(type)) {
    filtered = filtered.filter((item) => item.type === type);
  }

  if (genre) {
    filtered = filtered.filter(
      (item) => item.genre.toLowerCase() === String(genre).toLowerCase(),
    );
  }

  if (q) {
    const query = String(q).toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.genre.toLowerCase().includes(query),
    );
  }

  res.status(200).json({ total: filtered.length, results: filtered });
});

app.get("/api/catalog/:id", (req, res) => {
  const item = catalog.find((entry) => entry.id === req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Title not found" });
  }

  return res.status(200).json(item);
});

app.get("/api/featured", (req, res) => {
  const featured = catalog[0];
  res.status(200).json(featured);
});

app.get("/api/my-list", (req, res) => {
  const list = catalog.filter((item) => myListIds.includes(item.id));
  res.status(200).json({ total: list.length, results: list });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "pages", "404.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
