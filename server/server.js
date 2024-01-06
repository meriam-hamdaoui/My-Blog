require("dotenv").config();
const express = require("express");

const { MongoClient } = require("mongodb");

// PORT
const port = process.env.PORT || 8000;

// lunch express app
const app = express();

// middlewares
app.use(require("cors")()); // allow cross-origin requests
app.use(express.json({ extended: false })); // parse request body as JSON

/** connect with DB function */
const connectWithDB = async (operations, res) => {
  try {
    const client = new MongoClient(process.env.DB_URI);
    const db = client.db("mernblog");
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// get all
app.get("/api/articles", async (req, res) =>
  connectWithDB(async (db) => {
    // const articleList = ;
    const articles = await db.collection("articles").find().toArray();

    setTimeout(() => res.status(200).json(articles), 2000);
  }, res)
);

// get by name

app.get("/api/articles/:name", async (req, res) => {
  const articleName = req.params.name;

  // Using connectWithDB to perform operations with the database
  connectWithDB(async (db) => {
    // const articleList = ;
    const articleByName = await db
      .collection("articles")
      .findOne({ name: articleName });

    if (!articleByName) {
      res.status(404).json(articleByName);
    } else {
      setTimeout(() => res.status(200).json(articleByName), 2000);
    }
  }, res);
});

// add comment
// app.post("/api/articles/:name/add-comment", async (req, res) => {
//   try {
//     const articleName = req.params.name;
//     const { author, text } = req.body;
//     // connect db
//     const client = await MongoClient.connect(process.env.DB_URI);
//     const articles = await client.db("mernblog").collection("articles");

//     // find and return all documents in the 'articles' collection
//     const updateArticle = await articles.findOneAndUpdate({
//       name: articleName,
//       $comments: [...comments, { author, text }],
//     });

//     if (!updateArticle) {
//       return res
//         .status(404)
//         .json({ message: "no article found with this name" });
//     }

//     res.json(updateArticle.comments);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// });

// listen
app.listen(port, () => console.log("server started at " + port));
