const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.WHISPER_API_KEY;


const userRoutes = require("./routes/users-routes");
const tasksRoutes = require("./routes/tasks-routes");
const assignsRoutes = require("./routes/assigns-routes");

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", tasksRoutes);
app.use("/assigns", assignsRoutes);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/speech-to-text", upload.single("audio"), async (req, res) => {
    try {
        const audioFile = req.file.buffer.toString("base64");
        const response = await axios.post(
            "https://api.openai.com/v1/whisper/async-transcription",
            {
                audio: audioFile,
            },
            {
                headers: {
                    Authorization: `Bearer ${WHISPER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Unable to perform action.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});