var Player = require("./model")

module.exports = {
	//draw
	delete: deletePlayerProfile,
	index: indexProfiles,
	newGame: newGame, 
	newPlayer: newPlayer,
	show: showProfile,
	updateProfile: updatePlayerProfile,
	
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
		
	})
}

function newPlayer (req, res) 
{
	console.log("testing newPlayer function")
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


function findPlayer (req, res, success) {
	var id = req.params.player
	Player.findById(id, function (err, item) {
		if (err) return reporterror(err, res)
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