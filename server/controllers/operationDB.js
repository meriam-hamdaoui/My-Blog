const connectWithDB = require("../config/connectDB");

exports.getAll = async (req, res) =>
  connectWithDB(async (db) => {
    // const articleList = ;
    const articles = await db.collection("articles").find().toArray();

    setTimeout(() => res.status(200).json(articles), 2000);
  }, res);

exports.getByName = async (req, res) => {
  const articleName = req.params.name;

  // Using connectWithDB to perform operations with the database
  await connectWithDB(async (db) => {
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
};

exports.addComment = async (req, res) => {
  try {
    let articleName = req.params.name;
    let { author, text } = req.body;

    await connectWithDB(async (db) => {
      const articleByName = await db
        .collection("articles")
        .findOne({ name: articleName });

      await db.collection("articles").updateOne(
        { name: articleName },
        {
          $set: {
            comments: [...articleByName.comments, { author, text }],
          },
        }
      );

      const updatedArticle = await db
        .collection("articles")
        .findOne({ name: articleName });

      res.status(200).json(updatedArticle);
    }, res);
  } catch (error) {
    res.status(400).json({ message: "ERROR updating article", error });
  }
};
// Add a new Article in the DB
exports.addArticle = async (req, res) => {};
