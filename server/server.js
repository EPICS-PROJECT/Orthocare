const express = require("express")
const app = express();
const connectDb = require("./config/db")
const bodyParser = require("body-parser")
const cors = require("cors")
const { readdirSync, read, readdir } = require("fs")
const morgan = require("morgan")
const dotenv = require("dotenv")
dotenv.config()
connectDb();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan("dev"))
app.get("/", (req, res) => {
    res.send("Server is on 🚀🚀")
})
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)))
app.listen(5000, () => {
    console.log("server is listening on port 5000");
})