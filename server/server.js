const express = require("express")
const app = express();

app.get("/", (req, res) => {
    res.send("Server is on 🚀🚀")
})
app.listen(5000, () => {
    console.log("server is listening on port 5000");
})