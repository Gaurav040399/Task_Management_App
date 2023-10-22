const mongoose = require("mongoose");
require("dotenv").config();

const connection = new mongoose.connect(process.env.mongoURL);

module.exports = {connection}