 const express = require("express");
const userRouter = require("./routes/users.routes");
const todoRouter = require("./routes/todos.routes");

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});