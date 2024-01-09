require("dotenv").config();
const model = require("./models/model");
const connect = require("./db/connect");
const json = require("./data.json");

const start = async () => {
  try {
    await connect(process.env.mongouri);
    await model.deleteMany();
    await model.create(json);
    console.log("Data is stored");
  } catch (error) {
    console.log(error);
  }
};

start();
