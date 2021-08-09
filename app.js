const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// MiddleWare

app.set("view engine" , "ejs")

app.get("/", function (req , res)  {
    res.render("index");
    // console.log("a")
})

app.listen(PORT , () => {
    console.log(`Server is rimming on port ${PORT}`);
})