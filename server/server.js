const express = require("express");

// initiate app
const app = express();
const PORT = 8000;

const articlesInfo = {
  "learn-react": {
    comments: [],
  },
  "learn-node": {
    comments: [],
  },
  "my-thoughts-on-learning-react": {
    comments: [],
  },
};

// initialize middleware
app.use(express.json({ extended: false }));

app.get("/api/articles/:name/comments", (req, res) => {
  // get the article name from req.params
  const articleName = req.params.name;
  res.status(200).send(articlesInfo[articleName]);
});

// text api's
app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  articlesInfo[articleName].comments.push({ username, text });
  res.status(200).send(articlesInfo[articleName]);
});

// port

app.listen(PORT, () => console.log("server started at " + PORT));
