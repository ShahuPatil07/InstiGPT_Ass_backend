//jshint esversion:6
const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const app= express();
const mongoose= require("mongoose");

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true});
const userSchema= {
    email: String,
    password: String
};
const User= new mongoose.model("User", userSchema);

app.get("/",function(req,res){
    res.render("home");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});

app.get('/submit', (req, res) => {
   res.render("submit");
  });
  app.get('/index', (req, res) => {
    res.render("index");
   });

app.post("/register",function(req, res){
    const newUser= new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save()
        .then(() => {
            res.render("secrets");
        })
        .catch((err) => {
            console.error(err);
        });
});

app.post("/login", function(req,res){
    const username= req.body.username;
    const password= req.body.password;

    User.findOne({ email: username, password: password })
        .then((user) => {
            if (user) {
                res.render("secrets");
            } else {
                res.render("login");
            }
        })
        .catch((err) => {
            console.error(err);
        });
})



app.listen(3000,function(){
 console.log("Server started on port 3000.");
});
