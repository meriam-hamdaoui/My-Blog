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
};
