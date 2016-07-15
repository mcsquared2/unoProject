var controller = require("./controller")
var express = require("express")
var router = express.Router()

router.post("/", controller.newPlayer)

router.get("/:player", controller.show)
router.get('/', controller.index)

router.put("/edit/:player", controller.updateProfile)

router.delete('/:player', controller.delete)

module.exports = router