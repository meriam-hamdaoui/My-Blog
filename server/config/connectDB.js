require("dotenv").config();

const { MongoClient } = require("mongodb");

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

module.exports = connectWithDB;
