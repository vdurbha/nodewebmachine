var router = new require('routes').Router()

module.exports = router

var helloworldresource = require("./resources/helloworld.js")
router.addRoute("/helloworld", helloworldresource)

var defaultresource = require("./resources/defaultresource.js")
router.addRoute("/", defaultresource)