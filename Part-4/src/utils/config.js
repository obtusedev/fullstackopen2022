const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
    MONGODB_URI,
    PORT,
};
