const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const CsbInspector = require('csb-inspector')

const { reportRequest } = require("./src/middlewares/logger");

app.use(reportRequest);
app.use(express.json());
app.use(cors());
CsbInspector()

app.listen(process.env.PORT, console.log("SERVIDOR ENCENDIDO"));


module.exports = app;