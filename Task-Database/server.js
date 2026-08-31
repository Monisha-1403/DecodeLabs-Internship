require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(function () {
        console.log("Connected to MongoDB");
    })
    .catch(function (error) {
        console.log("MongoDB connection error:", error);
    });


// Home route
app.get("/", function (req, res) {
    res.json({
        message: "Task Database API is running"
    });
});


// GET - Get all tasks
app.get("/tasks", async function (req, res) {
    try {
        const tasks = await Task.find();

        res.json(tasks);

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch tasks"
        });
    }
});


// POST - Create a new task
app.post("/tasks", async function (req, res) {
    try {
        const title = req.body.title;

        // Basic validation
        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const newTask = new Task({
            title: title.trim()
        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);

    } catch (error) {
        res.status(500).json({
            message: "Unable to create task"
        });
    }
});


// PUT - Update a task
app.put("/tasks/:id", async function (req, res) {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(updatedTask);

    } catch (error) {
        res.status(500).json({
            message: "Unable to update task"
        });
    }
});


// DELETE - Delete a task
app.delete("/tasks/:id", async function (req, res) {
    try {
        const deletedTask = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to delete task"
        });
    }
});


// Start server
app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`);
});
