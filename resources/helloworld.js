var defaultresource = require("./defaultresource.js")

var helloworldresource = function(req, res) {

	var that = defaultresource(req, res)

	that.serviceAvailable = function(){
		return true
	}

	that.authorized = function() {
		return true
	}

	that.contentTypesAccepted = function() {
		return [{"application/x-www-form-urlencoded": "post"},
					 {"application/octet-stream": "post"}]
	}

	that.to_html = function(){
		console.log("Inside to_html")
		that.body = "Hello world\n"
	}

	that.post = function() {
		console.log("Post successful")
	}

	return that;
	
}

module.exports = helloworldresource



