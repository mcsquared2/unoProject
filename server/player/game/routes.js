var controller = require('./controller')
var express = require('express')
var router = express.Router()

router.post('/:player/newGame', controller.newGame)