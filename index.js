const express = require('express');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;


app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
});