module.exports = site

var router = require("./router.js")
var url = require("url")

function site(req, res){

  var path = url.parse(req.url).pathname
	var route = router.match(path)
	console.log(route)
	route.fn(req, res).execute()

}