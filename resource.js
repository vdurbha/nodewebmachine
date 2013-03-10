
function resource(req, res) {
	var that = {
		that.req = this.req;
		that.res =  this.res;

		service_available: function(req, res){
			return true;
		}

		known_method: function(req, res){
			var method = req.method;

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
		}
		
		uri_too_long: function(req, res){
			return false;
		}

		allowed_methods: function(req, res){
			return ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'];
		}

		malformed_request: function(req, res){
			return false;
		}

		is_authorized: function(req, res){
			return true;
		}

		forbidden: function(req, res){
			return false;
		}

		valid_content_headers: function(req, res){
			return true;
		}

		known_content_type: function(req, res){
			return true;
		}

		valid_entity_length: function(req, res){
			return true;
		}
		
		
	}

	return that;

}