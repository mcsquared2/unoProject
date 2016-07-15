"use strict";
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var skipper = require("skipper");
var colors = require("colors");


mongoose.connect("mongodb://mongodb.cs.dixie.edu/unoOnline")

mongoose.connection.on("connected", function() {
	console.log("Connected to DB. Yeah!".blue)
})

mongoose.connection.on("error", function (err) {
	console.log("Boohoo! DB connection failed... /n".red + err.message)
})

var app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/dist"));
app.use(skipper());

app.use("/profile", require("./server/player/routes"))

app.get("*", function (req, res)
{
	res.sendFile(__dirname + "/dist/index.html");
});

app.listen(8000, function() {
	console.log("Our app is using port 8000")
});
// console.log("Listening on port 8000");