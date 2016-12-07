var express = require("express"),
    path = require("path");

module.exports = (req, res, next) =>{
    var url = path.join(__dirname,"./../../node_modules", req.url);
    //todo check if file should be allowed to send. 
    res.sendFile(url);
}