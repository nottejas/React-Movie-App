const express = require("express");
const freekeys = require("freekeys");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/get-movie-key", async (req, res) => {
  try {
    const keys = await freekeys();
    res.json({ tmdb_key: keys.tmdb_key });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch API key" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
