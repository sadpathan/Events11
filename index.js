var express = require("express");
var bodyparser = require("body-parser");

var mysql = require("mysql");
// var util = require("util");
var upload = require("express-fileupload");
var session = require("express-session");
var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"events"
});
var app = express();
app.use(session({
    secret:"dgfhhhghfhghfh",
    resave:true,
    saveUninitialized:true
}));

app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public/"));
app.use(upload());

app.get("/",function(req,res){
    res.render("index.ejs")
});
app.post("/save_event", async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO events (name, location, description, event_date, event_time) VALUES(?,?,?,?,?)`;
    var data = await exe(sql,[d.event_name, d.event_location, d.event_description, d.event_date, d.event_time]);
    res.redirect("/");
})


app.listen(1000);





