const express = require("express");

const app = express();

const PORT = 3000;
const tasks = [
    {
        id: 1,
        title: "Learn Node.js",
        completed: false
    },
    {
        id: 2,
        title: "Build an API",
        completed: false
    }
];

app.use(express.json());

app.get("/tasks", function (req, res) {
    res.json(tasks);
});

app.post("/tasks", function (req, res) {

    const title = req.body.title;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title.trim(),
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`);
});
