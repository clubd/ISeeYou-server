const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const userRoutes = require("./routes/users-routes");
const tasksRoutes = require("./routes/tasks-routes");
const assignsRoutes = require("./routes/assigns-routes");

app.use("/users", userRoutes);
app.use("/tasks", tasksRoutes);
app.use("/assigns", assignsRoutes);


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});