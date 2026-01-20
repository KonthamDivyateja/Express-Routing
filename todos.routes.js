 const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

/* CREATE TODO */
router.post("/add", (req, res) => {
  const db = readDB();
  const newTodo = { id: Date.now(), ...req.body };

  db.todos.push(newTodo);
  writeDB(db);

  res.status(201).json(newTodo);
});

/* GET ALL TODOS */
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

/* GET SINGLE TODO */
router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todo = db.todos.find(t => t.id == req.params.todoId);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo);
});

/* UPDATE TODO */
router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id == req.params.todoId);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  db.todos[index] = { ...db.todos[index], ...req.body };
  writeDB(db);

  res.json(db.todos[index]);
});

/* DELETE TODO */
router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const updatedTodos = db.todos.filter(t => t.id != req.params.todoId);

  if (updatedTodos.length === db.todos.length) {
    return res.status(404).json({ error: "Todo not found" });
  }

  db.todos = updatedTodos;
  writeDB(db);

  res.json({ message: "Todo deleted successfully" });
});

module.exports = router;