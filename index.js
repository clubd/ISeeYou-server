const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const filepath = path.join(__dirname, "audio.mp3");
const model = "whisper-1";

const formData = new FormData();
formData.append("model", model);
formData.append("file", fs.createReadStream(filepath));

axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
    headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "content-type": `multipart/form-data, boundary=${formData._boundary}`,
    },
    })
    .then((response) => {
        console.log (response.data);
    })
        .catch((error) => {
            console.error(error);
        });

const userRoutes = require("./routes/users-routes");
const tasksRoutes = require("./routes/tasks-routes");
const assignsRoutes = require("./routes/assigns-routes");
const { error } = require("console");

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", tasksRoutes);
app.use("/assigns", assignsRoutes);


app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});