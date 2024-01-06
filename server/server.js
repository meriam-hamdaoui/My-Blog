require("dotenv").config();
const express = require("express");

// get controllers
const { getAll, getByName } = require("./controllers/operationDB");

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
