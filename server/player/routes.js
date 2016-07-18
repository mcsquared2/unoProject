var controller = require("./controller")
var express = require("express")
var router = express.Router()
var gameController = require("./game/controller")

// routes for creating and updating a profile
router.post("/profile/", controller.newPlayer)

router.get("/profile/:player", controller.show)
router.get('/profile/', controller.index)

router.put("/profile/:player", controller.updateProfile)

router.delete('/profile/:player', controller.delete)

// routes for creating and updating a game 
router.post('/game/:player', controller.newGame)
// router.get('game/:player', controller.showGame)


router.delete('/game/:player', controller.deleteGame)


module.exports = router