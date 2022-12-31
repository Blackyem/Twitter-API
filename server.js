const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const colors = require("colors");

const userRoutes = require("./routes/user");
const tweetRoutes = require("./routes/tweet");



const app = express();
dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`.bold.blue)
});