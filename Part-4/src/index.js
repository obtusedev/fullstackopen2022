const express = require("express");
const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/note");

mongoose
    .connect(config.MONGODB_URI, () => {
        logger.info(`Connected to DB`);
    })
    .catch(err => logger.error(err));

app.use(express.json());
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
    res.status(200).send("Home page");
});

app.listen(config.PORT, () => {
    logger.info(`Server running on ${config.PORT}`);
});
