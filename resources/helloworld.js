var defaultresource = require("./defaultresource.js")

var helloworldresource = function(req, res) {

	var that = defaultresource(req, res)

	that.serviceAvailable = function(){
		return true
	}

	that.authorized = function() {
		return true
	}

	that.contentTypesProvided = function() {
		return ["application/collection+json"]
	}

	that.languagesProvided = function() {
		return ["*/*"]
	}

	that.charsetsProvided = function() {
		return ["*/*"]
	}

	that.to_html = function(){
		that.response.end("Hello world\n")
	}

	return that;
	
}

module.exports = helloworldresource



