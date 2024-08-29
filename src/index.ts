import express from "express";
import path from "path";
import route from "./routes/router";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/temp", express.static(path.join(__dirname, "../temp")));

app.use("/api", route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
