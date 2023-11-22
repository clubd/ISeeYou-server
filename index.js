const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const userRoutes = require("./routes/users-routes");

app.use("/users", userRoutes);


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});