const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require("dotenv").config();
const app = express();

app.use(express.json())
app.use(cors());

const con = mysql.createConnection({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
})