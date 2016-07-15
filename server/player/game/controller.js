var Game = require('./model')
// var Player = require('./player/model')


module.exports = {
	newGame: newGame
}

function newGame (req, res) {
	
	newHand = [];
	for (var i = 0; i < 7; i++) 
	{
		newHand.push(createCard())
	}

	Game.create( 
	{
		hand:newhand,
		stack:createCard(),
	}, function (err, game) {
		if (err) return reportError(err, res)

		res.status(201).json(game)
	})
}


var colors= ['red', 'blue', 'green', 'yellow']
function createCard () 
{
	num = Math.floor(Math.random() * 15)
	if (num > 12) 
	{
		color = 'black'
	} 
	else {
		color = colors[Math.floor(Math.random() * 4)]
	}
	return {
		color:color,
		num: num
	}
}

function findPlayer (req, res, success) {
	var id = req.params.player
	Player.findById(id, function (err, player) {
		if (err) return reporterror(err, res)
		if (!player) {
			res.status(404).json({
				error:'Could not find player with that ID'
			})
		} else {
			success(player)
		}
	})
}

function findGame (req, res, success) {
	findPlayer(req, res, function (player) {
		Game.findbyId(player.gameId, function (err, game) {
			if (err) return reporterror(err, res)
			if (!game) {
				res.status(404).json({
					error:'Could not find game with that ID'
				})
			} else {
				success(game)
			}		})
	})
}

function reportError(err, res) {
	if (err.name === "ValidationError") {
		res.status(422).json({
			error: err.message
		})
	}
}