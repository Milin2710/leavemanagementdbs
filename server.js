// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

// const uri = "mongodb://localhost:27017/populations";
const uri = "mongodb+srv://milins2710:milinsocin32@socin.mmlzaer.mongodb.net/";

mongoose.connect(uri);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// const Todo = require("./models/user");
// Define a schema
const leaveSchema = new mongoose.Schema({}, { strict: false }); // Allow any schema
const Leave = mongoose.model("Leave", leaveSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/public/style.css");
})

app.get("/api/data", async (req, res) => {
  try {
    const todoData = await Leave.find();
    res.json(todoData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/data/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const deletedTodo = await Leave.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/submit", async (req, res) => {
  const { name, sno, date1, date2, cl, pl, el, dl, ml, ccl, ml2, pl2, ol, sanction } = req.body;

  try {
    // Create a new user
    const newTodo = new Leave({ name, date1, date2, cl, pl, el, dl, ml, ccl, ml2, pl2, ol, sanction });

    // Save the user to the database
    const savedTodo = await newTodo.save();

    //   res.send(`User saved successfully! ID: ${savedUser._id}`);
    // res.sendFile(__dirname + "/public/index.html");
    // res.redirect('/');

  } catch (error) {
    console.error("Error saving todo:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});