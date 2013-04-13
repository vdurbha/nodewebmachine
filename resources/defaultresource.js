var mimeparse = require("../mimeparse.js")

var defaultresource = function(req, res) {
	
	return {

		request: req,
		response: res,
		stack: [],
		responseCode: "",
		headers: {},
		body: "",
		movedUri: "",
		redirect: false,
		newpath: "",
		location: "",
		etag: undefined,
		incomingContentType: undefined,
		lastModified: undefined,
		expires: undefined,

		serviceAvailable: function(){
			return false;
		},

		knownMethod: function(){
			var method = this.request.method;
			if(method === 'OPTIONS'
				 || method === 'GET'
				 || method === 'HEAD'
				 || method === 'POST'
				 || method === 'PUT'
				 || method === 'DELETE'
				 || method === 'TRACE'
				 || method === 'CONNECT') {
				return true
			} else {
				return false
			}
		},

		uriTooLong: function(){
			return false
		},

		allowedMethods: function() {
			return ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'];			
		},

		malformed: function() {
			return false
		},

		authorized: function() {
			return false
		},

		forbidden: function() {
			return false
		},

		validContentHeaders: function() {
			return ["Content-Encoding",
							"Content-Language",
							"Content-Length",
							"Content-Location",
							"Content-MD5",
							"Content-Range",
							"Content-Type"]
		},

		knownContentType: function() {
			return "application/www-form-urlencoded"
		},

		requestEntityTooLarge: function() {
			return false
		},

		options: function() {
			this.headers["Allow"] = this.allowedMethods().join(",")
		},

		variances: function() {
			return []
		},

		contentTypesProvided: function() {
			return [{"text/html": "to_html"}]
		},

		contentTypesAccepted: function() {
			return []
		},

		languagesProvided: function() {
			return ["*/*"]
		},

		charsetsProvided: function() {
			return ["*/*"]
		},
		
		resourceExists: function() {
			return true
		},

		movedPermanently: function(){
			return false
		},

		movedTemporarily: function(){
			return false
		},

		previouslyExisted: function() {
			return false
		},

		allowMissingPost: function(){
			return true
		},

		deleteResource: function() {
			return true
		},

		deleteCompleted: function() {
			return true
		},
		
		postIsCreate: function() {
			return false
		},

		createPath: function() {
			return "/"
		},

		isConflict: function() {
			return false
		},

		multipleChoices: function(){
			return false
		},
		
		generateEtag: function(){
			return
		},

		lastModified: function(){
			return this.lastModified
		},

		expires: function() {
			return this.expiry
		},

		to_html: function(){
			res.end("Default Resource")
		},

		b13Action: function(){
			if(this.serviceAvailable()){
				return true
			} else {
				return false
			}
		},

		b12Action: function(){
			if(this.knownMethod()) {
				return true
			} else {
				return false
			}
		},

		b11Action: function(){
			if(this.uriTooLong()){
				return true
			} else {
				return false
			}
		},

		b10Action: function(){
			if(this.allowedMethods().indexOf(this.request.method) >= 0) {
				return true
			} else {
				return false
			}
		},

		b9Action: function(){
			if(this.malformed()){
				return true
			} else {
				return false
			}
		},

		b8Action: function(){
			if(this.authorized()){
				return true
			} else {
				return false
			}
		},

		b7Action: function(){
			if(this.forbidden()){
				return true
			} else {
				return false
			}
		},

		b6Action: function(){
			var contentEncoding = this.request.headers["Content-Encoding"]
			var contentLanguage = this.request.headers["Content-Language"]
			var contentLength = this.request.headers["Content-Length"]
			var contentLocation = this.request.headers["Content-Location"]
			var contentMD5 = this.request.headers["Content-MD5"]
			var contentRange = this.request.headers["Content-Range"]
			var contentType = this.request.headers["Content-Type"]
			
			if(contentEncoding && validContentHeaders.indexOf("Content-Encoding") < 0) {
				return true
			}

			if(contentLanguage && validContentHeaders.indexOf("Content-Language") < 0) {
				return true
			}

			if(contentLength && validContentHeaders.indexOf("Content-Length") < 0) {
				return true
			}

			if(contentLocation && validContentHeaders.indexOf("Content-Location") < 0) {
				return true
			}

			if(contentMD5 && validContentHeaders.indexOf("Content-MD5") < 0) {
				return true
			}

			if(contentRange && validContentHeaders.indexOf("Content-Type") < 0) {
				return true
			}

			if(contentType && validContentHeaders.indexOf("Content-Type") < 0) {
				return true
			}

			return false

		},

		b5Action: function() {
			var contentType = this.request.headers["Content-Type"]
			if(contentType && this.knownContentType() !== contentType) {
				return true
			} else {
				return false
			}
		},

		b4Action: function() {
			if(this.requestEntityTooLarge()){
				return true
			} else {
				return false
			}
		},

		b3Action: function() {
			if (this.request.method === "OPTIONS"){
				this.options()
				return true
			} else {
				return false
			}
		},

		c3Action: function(){
			if(this.request.headers["accept"]) {
				return true
			} else {
				return false
			}
		},

		c4Action: function() {
			var acceptHeader = this.request.headers["accept"]
			var contentTypesArray = []
			for(var contentType in this.contentTypesProvided()) {
				contentTypesArray.push(Object.keys(this.contentTypesProvided()[contentType]).toString())
			}
			if(mimeparse.bestMatch(contentTypesArray, acceptHeader).length > 0) {
				incomingContentType = mimeparse.bestMatch(contentTypesArray, acceptHeader)
				return true
			} else {
				return false
			}
		},

		d4Action: function() {
			if(this.request.headers["accept-language"]) {
				return true
			} else {
				return false
			}
		},

		d5Action: function() {
			var acceptLanguageHeader = this.request.headers["accept-language"]
			if(mimeparse.bestMatch(this.languagesProvided(), acceptlanguageHeader).length > 0) {
				return true
			} else {
				return false
			}			
		},

		e5Action: function() {
			if(this.request.headers["accept-charset"]) {
				return true
			} else {
				return false
			}
		},

		e6Action: function() {
			var acceptCharsetHeader = this.request.headers["accept-charset"]
			if(mimeparse.bestMatch(this.charsetsProvided(), acceptcharsetHeader).length > 0) {
				return true
			} else {
				return false
			}			
		},

		f6Action: function() {
			if(this.request.headers["accept-encoding"]) {
				return true
			} else {
				return false
			}
		},

		f7Action: function() {
			var acceptEncodingHeader = this.request.headers["accept-encoding"]
			if(mimeparse.bestMatch(this.encodingsProvided(), acceptEncodingHeader).length > 0) {
				return true
			} else {
				return false
			}			
		},

		g7Action: function() {
			if(this.variances().length > 0) {
				this.headers["Vary"] = this.variances().join(",")
			}
			if(this.resourceExists()) {
				return true
			} else {
				return false
			}
		},

		g8Action: function() {
			if(this.request.headers["if-match"]) {
				return true
			} else {
				return false
			}
		},

		g9Action: function() {
			if(this.request.headers["if-match"] === "*"){
				return true
			} else {
				return false
			}
		},

		g11Action: function() {
			var ifMatchHeader = this.request.headers["if-match"]
			var ifMatchHeaderArray = ifMatchHeader.split(",")
			this.generateEtag()
			if(ifMatchHeaderArray.indexOf(etag) >= 0){
				return true
			} else {
				return false
			}
		},

		h7Action: function() {
			if(this.request.headers["if-match"] === "*"){
				return true
			} else {
				return false
			}
		},

		h10Action: function() {
			if(this.request.headers["if-unmodified-since"]) {
				return true
			} else {
				return false
			}
		},

		h11Action: function() {
			var ifUnmodifiedSinceHeader = this.request.headers["if-unmodified-since"]
			if(isValidDate(ifUnmodifiedSinceHeader)) {
				return true
			} else {
				return false
			}
		},

		h12Action: function() {
			var ifUnmodifiedSinceHeader = this.request.headers["if-unmodified-since"]
			var lastModifiedHeader = this.request.headers["last-modifed"]
			if(isValidDate(lastModifiedHeader)){
				var d1 = new Date(lastModifiedHeader)
				var d2 = new Date(ifUnmodifedSinceHeader)
				if(d1 > d2) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		},

		i7Action: function() {
			if(this.request.method === "PUT") {
				return true
			} else {
				return false
			}
		},

		i4Action: function() {
			if(this.movedPermanently()){
				this.headers["Location"] = this.movedUri
				return true
			} else {
				return false
			}
		},

		i12Action: function() {
			if(this.request.headers["if-none-match"]) {
				return true
			} else {
				return false
			}			
		},

		i13Action: function() {
			if(this.request.headers["if-none-match"] === "*"){
				return true
			} else {
				return false
			}
		},

		j18Action: function() {
			if(this.request.method === "GET" || this.request.method === "HEAD"){
				return true
			} else {
				return false
			}
		},

		k7Action: function() {
			if(this.previouslyExisted()){
				return true
			} else {
				return false
			}
		},

		k5Action: function() {
			if(this.movedPermanently()){
				this.headers["Location"] = this.movedUri
				return true
			} else {
				return false
			}			
		},

		k13Action: function() {
			var ifNoneMatchHeader = this.request.headers["if-none-match"]
			var ifNoneMatchHeaderArray = ifNoneMatchHeader.split(",")
			if(!this.etag){
				this.generateEtag()
			}
			if(ifNoneMatchHeaderArray.indexOf(etag) >= 0){
				return true
			} else {
				return false
			}
		},

		l5Action: function() {
			if(this.movedtemporarily()){
				this.headers["Location"] = this.movedUri
				return true
			} else {
				return false
			}			
		},

		l7Action: function() {
			if(this.request.method === "POST"){
				return true
			} else {
				return false
			}
		},

		l13Action: function() {
			if(this.request.headers["if-modified-since"]) {
				return true
			} else {
				return false
			}
		},

		l14Action: function() {
			var ifModifiedSinceHeader = this.request.headers["if-modified-since"]
			if(isValidDate(ifModifiedSinceHeader)) {
				return true
			} else {
				return false
			}
		},

		l15Action: function() {
			var ifModifiedSinceHeader = this.request.headers["if-modified-since"]
			var d1 = new Date(ifUnmodifedSinceHeader)
			var d2 = new Date()
			if(d1 > d2) {
				return true
			} else {
				return false
			}
		},

		l17Action: function() {
			var ifModifiedSinceHeader = this.request.headers["if-modified-since"]
			var lastModifiedHeader = this.request.headers["last-modifed"]
			if(isValidDate(lastModifiedHeader)){
				var d1 = new Date(lastModifiedHeader)
				var d2 = new Date(ifModifedSinceHeader)
				if(d1 > d2) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		},

		m5Action: function() {
			if(this.request.method === "POST"){
				return true
			} else {
				return false
			}
		},

		m7Action: function() {
			if(this.allowMissingPost()){
				return true
			} else {
				return false
			}
		},

		m16Action: function() {
			if(this.request.method === "DELETE"){
				return true
			} else {
				return false
			}
		},

		m20Action: function() {
			if(this.deleteResource()){
				return true
			} else {
				return false
			}
		},

		m20bAction: function() {
			if(this.deleteCompleted()){
				return true
			} else {
				return false
			}
		},

		n5Action: function() {
			if(this.allowMissingPost()){
				return true
			} else {
				return false
			}
		},

		n11Action: function() {
			if(this.postIsCreate()){
				this.createPath()
				if(this.newpath.length > 0){
					this.acceptHelper()
					if(this.redirect){
						if(this.location.length > 0){
							return true
						}
					} else {
						return false
					}
				}
			} else {
				if(this.processPost()){
					if(this.redirect){
						if(this.location.length > 0){
							return true
						}
					} else {
						return false
					}
				}
			}
		},

		n16Action: function() {
			if(this.request.method === "POST") {
				return true
			} else {
				return false
			}
		},

		o16Action: function() {
			if(this.request.method === "PUT"){
				return true
			} else {
				return false
			}
		},

		o14Action: function() {
			if(this.isConflict()){
				return true
			} else {
				return false
			}
		},

		o18Action: function() {
			if(this.request.method === "GET" || this.request.method === "HEAD"){
				if(!this.etag) {
					this.generateEtag()
				}
				if(this.lastModified()){
					this.headers["last-modified"] = new Date().toString()
				}
				if(this.expires()){
					this.headers["expiry"] = new Date(this.expires()).toString()
				}
				for(var i in this.contentTypesProvided()) {
					var contentType = this.contentTypesProvided()[i]
					if(contentType[incomingContentType]) {
						this[contentType[incomingContentType]]()
					}
				}
			}
			if(this.multipleChoices()) {
				return true
			} else {
				return false
			}
		},

		o20Action: function() {
			if(this.body.length > 0) {
				return true
			} else {
				return false
			}
		},

		p3Action: function(){
			if(this.isConflict()){
				return true
			} else {
				return false
			}			
		},

		p11Action: function() {
			if(this.location.length > 0){
				return true
			} else {
				return false
			}
		},


		webMachineProcess: {
			b13: {fn: "b13Action", truePath: "b12", falsePath: 503},
			b12: {fn: "b12Action", truePath: "b11", falsePath: 501},
			b11: {fn: "b11Action", truePath: 414, falsePath: "b10"},
			b10: {fn: "b10Action", truePath: "b9", falsePath: 405},
			b9: {fn: "b9Action", truePath: 400, falsePath: "b8"},
			b8: {fn: "b8Action", truePath: "b7", falsePath: 401},
			b7: {fn: "b7Action", truePath: 403, falsePath: "b6"},
			b6: {fn: "b6Action", truePath: 501, falsePath: "b5"},
			b5: {fn: "b5Action", truePath: 415, falsePath: "b4"},
			b4: {fn: "b4Action", truePath: 413, falsePath: "b3"},
			b3: {fn: "b3Action", truePath: 200, falsePath: "c3"},
			c3: {fn: "c3Action", truePath: "c4", falsePath: "d4"},
			c4: {fn: "c4Action", truePath:"d4", falsePath: 406},
			d4: {fn: "d4Action", truePath: "d5", falsePath: "e5"},
			d5: {fn: "d5Action", truePath: "e5", falsePath: 406},
			e5: {fn: "e5Action", truePath: "e6", falsePath: "f6"},
			e6: {fn: "e6Action", truePath: "f6", falsePath: 406},
			f6: {fn: "f6Action", truePath: "f7", falsePath: "g7"},
			f7: {fn: "f7Action", truePath: "g7", falsePath: 406},
			g7: {fn: "g7Action", truePath: "g8", falsePath: "h7"},
			g8: {fn: "g8Action", truePath: "g9", falsePath: "h10"},
			g9: {fn: "g9Action", truePath: "h10", falsePath: "g11"},
			g11: {fn: "g11Action", truePath: "h10", falsePath: 412},
			h7: {fn: "h7Action", truePath: 412, falsePath: "i7"},
			h10: {fn: "h10Action", truePath: "h11", falsePath: "i12"},
			h11: {fn: "h11Action", truePath: "h12", falsePath: "i12"},
			h12: {fn: "h12Action", truePath: 412, falsePath: "i12"},
			i7: {fn: "i7Action", truePath: "i4", falsePath: "k7"},
			i4: {fn: "i4Action", truePath: 301, falsePath: "p3"},
			i12: {fn: "i12Action", truePath: "i13", falsePath: "l13"},
			i13: {fn: "i13Action", truePath: "j18", falsePath: "k13"},
			j18: {fn: "j18Action", truePath: 304, falsePath: 412},
			k7: {fn: "k7Action", truePath: "k5", falsePath: "l7"},
			k5: {fn: "k5Action", truePath: 301, falsePath: "l5"},
			k13: {fn: "k13Action", truePath: "j18", falsePath: "l13"},
			l5: {fn: "l5Action", truePath: 307, falsePath: "m5"},
			l7: {fn: "l7Action", truePath: "m7", falsePath: 404},
			l13: {fn: "l13Action", truePath: "l14", falsePath: "m16"},
			l14: {fn: "l14Action", truePath: "l15", falsePath: "m16"},
			l15: {fn: "l15Action", truePath: "m16", falsePath: "l17"},
			l17: {fn: "l17Action", truePath: "m16", falsePath: 304},
			m5: {fn: "m5Action", truePath: "n5", falsePath: 410},
			m7: {fn: "m7Action", truePath: "n11", falsePath: 404},
			m16: {fn: "m16Action", truePath: "m20", falsePath: "n16"},
			m20: {fn: "m20Action", truePath: "m20b", falsePath: 500},
			m20b: {fn: "m20bAction", truePath: "o20", falsePath: 202},
			n5: {fn: "n5Action", truePath: "n11", falsePath: 410},
			n11: {fn: "n11Action", truePath: 303, falsePath: "p11"},			
			n16: {fn: "n16Action", truePath: "n11", falsePath: "o16"},
			o16: {fn: "o16Action", truePath: "o14", falsePath: "o18"},			
			o14: {fn: "o14Action", truePath: 409, falsePath: "p11"},			
			o18: {fn: "o18Action", truePath: 300, falsePath: 200},			
			o20: {fn: "o20Action", truePath: "o18", falsePath: 204},			
			p3: {fn: "p3Action", truePath: 409, falsePath: "p11"},
			p11: {fn: "p11Action", truePath: 201, falsePath: "o20"},
			start: "b13"
		},

		isValidDate: function(dateString) {
			var d = new Date(dateString)
			if ( Object.prototype.toString.call(d) !== "[object Date]" )
				return false;
			return !isNaN(d.getTime());
		},

		acceptHelper: function(){
			var contentTypeHeader = this.request.headers["content-type"]
			var contentTypeHandler = undefined
			if(!contentTypeHeader){
				contentTypeHeader = "application/octet-stream"
				this.headers["content-type"] = "application/octet-stream"
			}
			for(var contentType in this.contentTypesAccepted()) {
				if(contentType[contentTypeHeader]){
					contentTypeHandler = contentType[contentTypeHeader]
				}
			}
			this[contentTypeHandler]()
		},

		executeProcess: function(){
			console.log("Inside executeProcess")
			var next = this.webMachineProcess[this.webMachineProcess.start];
			console.log("Pushing " + this.webMachineProcess.start + " to stack")
			this.stack.push(this.webMachineProcess.start)

			while(next.hasOwnProperty('fn') && ((typeof this[next.fn]) === "function")){
				if(this[next.fn]()){
					console.log("Pushing " + next.truePath + " to stack")
					this.stack.push(next.truePath)
					if(typeof next.truePath === "string"){
						next = this.webMachineProcess[next.truePath]
					} else {
						next = next.truePath
					}
				} else {
					console.log("Pushing " + next.falsePath + " to stack")
					this.stack.push(next.falsePath)
					if(typeof next.falsePath === "string"){
						next = this.webMachineProcess[next.falsePath]
					} else {
						next = next.falsePath
					}
				}
			}
			this.responseCode = next
			this.headers["Decision-Stack"] = this.stack.join(",")
			this.respond()
		},

		respond: function(){
			this.response.statusCode = this.responseCode
			for(var ownProperty in this.headers){
				this.response.setHeader(ownProperty, this.headers[ownProperty])
			}
			this.response.write(this.body)
			this.response.end()
		},

		execute: function() {
			console.log("Inside execute")
			this.executeProcess()
		}
	};
}

module.exports = defaultresource