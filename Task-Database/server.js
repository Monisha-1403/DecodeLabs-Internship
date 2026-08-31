require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(function () {
        console.log("Connected to MongoDB");
    })
    .catch(function (error) {
        console.log("MongoDB connection error:", error);
    });

app.get("/", function (req, res) {
    res.json({
        message: "Task Database API is running"
    });
});

app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`);
});
