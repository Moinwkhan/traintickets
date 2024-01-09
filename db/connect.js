const mongoose = require("mongoose");

const connect = async (uri) => {
  console.log("Database Connected");
  await mongoose.connect(uri);
};

module.exports = connect;
