var http = require("http")
var site = require("./site.js")

http.createServer(site).listen(1337, '127.0.0.1');

console.log("Server running at http://127.0.0.1:1337/")