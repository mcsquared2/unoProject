var controller = require('./controller')
var express = require('express')
var router = express.Router()

router.delete('/deletegame/:game', controller.deleteSpecific)
router.get('/', controller.index)
router.put('/:game', controller.update)
router.get('/:game', controller.show)
router.put('/draw/:numCards/:game', controller.draw)

module.exports = router