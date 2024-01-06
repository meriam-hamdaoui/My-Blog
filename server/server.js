require("dotenv").config();
const express = require("express");

const { MongoClient } = require("mongodb");

// PORT
const port = process.env.PORT || 8000;

// lunch express app
const app = express();

// data
// const articles = [
//   {
//     name: "learn-react",
//     comments: [{ author: "souad", text: "I like this articles" }],
//   },
//   {
//     name: "learn-node",
//     comments: [{ author: "mariem", text: "It needs some improvement" }],
//   },
//   {
//     name: "my-thoughts-on-learning-react",

//     comments: [],
//   },
// ];

// middlewares
app.use(require("cors")()); // allow cross-origin requests
app.use(express.json({ extended: false })); // parse request body as JSON

// get all
app.get("/api/articles", async (req, res) => {
  try {
    // connect db
    const client = await MongoClient.connect(process.env.DB_URI);
    const articles = client.db("mernblog").collection("articles");

    // find and return all documents in the 'articles' collection
    const articleTab = await articles.find().toArray();

    setTimeout(() => {
      return res.status(200).json(articleTab);
    }, 3000);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get by name
app.get("/api/articles/:name", async (req, res) => {
  try {
    const articleName = req.params.name;
    // connect db
    const client = await MongoClient.connect(process.env.DB_URI);
    const db = client.db("mernblog");
    const articleList = db.collection("articles");

    // find and return all documents in the 'articles' collection
    const articleByName = await articleList.findOne({ name: articleName });

    if (!articleByName) res.status(404).json(articleByName);

    if (articleByName)
      setTimeout(() => res.status(200).json(articleByName), 2000);

    client.close();
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// add comment
app.post("/api/articles/:name/add-comment", async (req, res) => {
  try {
    const articleName = req.params.name;
    const { author, text } = req.body;
    // connect db
    const client = await MongoClient.connect(process.env.DB_URI);
    const articles = await client.db("mernblog").collection("articles");

    // find and return all documents in the 'articles' collection
    const updateArticle = await articles.findOneAndUpdate({
      name: articleName,
      $comments: [...comments, { author, text }],
    });

    if (!updateArticle) {
      return res
        .status(404)
        .json({ message: "no article found with this name" });
    }

    res.json(updateArticle.comments);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// listen
app.listen(port, () => console.log("server started at " + port));
