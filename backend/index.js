const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());


app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
    })
);