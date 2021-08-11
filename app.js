const express = require("express");
const app = express();
const cookieParser  =require('cookie-parser')
const PORT = process.env.PORT || 5000;

// Google auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "160737363076-5u5348d7j5f3o7cskkaa7c33f0egnocc.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
// MiddleWare

app.set("view engine" , "ejs")
app.use(express.json());
app.use(cookieParser())
app.get("/", function (req , res)  {
    res.render("index");
})
app.get("/login" , (req,res) => {
    res.render("login")
})
app.post("/login" , (req,res) => {
    const {token} = req.body;
    let user= {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        user.name = payload.name;
        user.email= payload.email;
        user.picture = payload.picture;

    }
    verify()
    .then(() => {
        res.cookie("session-token" , token);
        res.send("success");
    })
    .catch(console.error);
})

app.get("/dashboard" , (req, res)=>{
    let user = req.user;
    res.render("dashboard" , {user});
})

app.get("protectedroute" , (req,res) => {
    // res.render("")
})
app.get("logout" , (req, res) => {
    res.clearCookie("session-token");
    res.redirect("/login")
})
app.listen(PORT , () => {
    console.log(`Server is rimming on port ${PORT}`);
})