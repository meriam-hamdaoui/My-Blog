require("dotenv").config();
const express = require("express");

// get controllers
const { getAll, getByName, addComment } = require("./controllers/operationDB");

// lunch express app
const app = express();

// middlewares
app.use(require("cors")()); // allow cross-origin requests
app.use(express.json({ extended: false })); // parse request body as JSON

// PORT
const port = process.env.PORT || 8000;

// get all
app.get("/api/articles", getAll);

// get by name
app.get("/api/articles/:name", getByName);

// add comment
app.post("/api/articles/:name/add-comment", addComment);

// listen
app.listen(port, () => console.log("server started at " + port));
