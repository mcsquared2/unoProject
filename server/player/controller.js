var Player = require("./model")
var Game = require("./game/model")
var gameController = require('./game/controller')

module.exports = {
	//draw
	deleteAll : deleteAllPlayers,
	deleteGame: deletePlayerGame,
	delete: deletePlayerProfile,
	index: indexProfiles,
	newGame: newGame, 
	newPlayer: newPlayer,
	show: showProfile,
	// showGame: showGame,
	updateProfile: updatePlayerProfile,
	
}

function deleteAllPlayers (req, res)
{
	Player.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.status(204).end('success');
            }
        }
    );
}

function deletePlayerGame (req, res)
{
	findPlayer(req, res, function(player)
	{
		gameController.delete(req, res, player.gameId, function(gameId)
		{
			console.log("inside deleteplayergame")
			player.gameId = gameId
			player.save(function (err, player) {
				if (err) return reportError(err, res)
				res.status(204).end()

			})
		})

	})
}

function deletePlayerProfile (req, res) 
{
	findPlayer(req, res, function (player) 
	{
		player.remove(function (err)
		{
			if (err) return reportError(err, res)
			res.status(204).end()
		})
	})
}


function indexProfiles(req, res) 
{
	Player.find(function (err, collection)
	{
		if (err) return reportError(err, res)
		res.json(collection)
	})
}


function newGame (req, res) 
{
	findPlayer(req, res, function (player) 
	{
		if (player.gameId)
		{
			gameController.delete(req, res, player.gameId, function (gameId)
			{
				player.gameId = null
			})
		} 
		
		
		gameController.newGame(req, res, function(game)
		{
			player.gameId = game._id
			player.save(function (err, player) {
				if (err) return reportError(err, res)
				res.status(201).json(game)

			})
			
		})
	})
}

function newPlayer (req, res) 
{
	// console.log("testing newPlayer function")
	Player.create( {
		profile : {
			username:req.body.username,
			password:req.body.password,
			name:req.body.name,
			email:req.body.email
		}
	}, function (err, player){
		if (err) return reportError(err, res)

		res.status(201).json(player)
	})
}

// function showGame (req, res)
// {
// 	console.log('we are really in the player showgame function')

// 	findPlayer(req, res, function (player)
// 	{
// 		console.log('we are in the player showgame function')
// 		// gameController.show(req, res, player.gameId)
// 	})
// }

function showProfile (req, res) 
{
	findPlayer(req, res, function (player)
	{
		res.json(player)
	})
}

function updatePlayerProfile(req, res) 
{
	findPlayer(req, res, function (player) 
	{
		player.profile.username = req.body.username
		player.profile.password = req.body.password
		player.profile.name = req.body.name
		player.profile.email = req.body.email

		player.save(function (err) 
		{
			if (err) return reportError(err, res)

			res.json(player)
		})
	})
}

// function findGame (req, res, gameId, success) {
// 	Game.findById(gameId, function (err, game) {
// 		if (err) return reportError(err, res)
// 		if (!game) {
// 			res.status(404).json({
// 				error:'Could not find game with that ID'
// 			})
// 		} else {
// 			success(game)
// 		}		})
// }


function findPlayer (req, res, success) {
	var id = req.params.player
	Player.findById(id, function (err, item) {
		if (err) return reportError(err, res)
		if (!item) {
			res.status(404).json({
				error:"Could not find item with that ID"
			})
		} else {
			success(item)
		}
	})
}

function reportError(err, res) {
	if (err.name === "ValidationError") {
		res.status(422).json({
			error: err.message
		})
	}
}