const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const app = express();

app.use(express.json());
app.use(
    express.static(path.join(__dirname, "../client/build"))
);
app.use(cors());

// mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("Connected to MongoDB")).catch(console.error);

mongoose.connect('mongodb+srv://jay_squared:NalaDog2023!@mernclusterproject.h8eohwo.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// mongodb+srv://jay_squared:<password>@mernclusterproject.h8eohwo.mongodb.net/?retryWrites=true&w=majority

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })

    todo.save();

    res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json({ result });
});

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.text = req.body.text;

    todo.save();

    res.json(todo);
});


app.listen(3002, () => console.log("server started on port 3002 test"))