var Game = require('./model')
// var Player = require('../player/model')


module.exports = {
	delete: deleteGame,
	deleteSpecific : deleteSpecific,
	draw: drawCard,
	index: indexGames,
	newGame: newGame,
	show: showGame,
	update: updateGame

}

function deleteGame(req, res, gameId, success) 
{
	findGame(req, res, gameId, function (game) 
	{
		game.remove(function (err)
		{
			if (err) return reportError(err, res)
			success(null)
		})
	})
}

function deleteSpecific (req, res) {
	var id = req.params.game
	findGame(req, res, id, function (game)
	{
		game.remove(function (err)
		{
			if (err) return reportError(err, res)
			res.status(204).end()
		})
	})
}

function drawCard (req, res) 
{
	var id = req.params.game
	var numCardsToDraw = req.params.numCards
	findGame(req, res, id, function (game)
	{
		for(var i =0; i < numCardsToDraw; i++)
		{

			game.hand[game.currentTurn].cards.push(createCard())
		}
		game.save(function (err)
		{
			if (err) return reportError(err, res)
			res.json(game)
		})
	})

}


function indexGames(req, res) 
{
	Game.find(function (err, collection)
	{
		if (err) return reportError(err, res)
		res.json(collection)
	})
}

function newGame (req, res, success) {
	playerHands = []
	var players = req.body.players
	for (var j = 0; j < players; j++)
	{
		newHand = {cards:[]};

		for (var i = 0; i < 7; i++) 
			{
				// console.log("added card")
				newHand.cards.push(createCard())
			}
		console.log("newHand = "+newHand)
		playerHands.push(newHand)
	}
	console.log(playerHands)
	Game.create( 
	{
		hand:playerHands,
		stack:createCard(),
		players:players
	}, function (err, game) {
		if (err) return reportError(err, res)

		success(game)
	})
}

function showGame (req, res)
{
	var gameId = req.params.game
	console.log(gameId)
	findGame(req, res, gameId, function (game)
	{
		res.json(game)
	})
}

function updateGame (req, res) 
{
	var gameId = req.params.game
	findGame(req, res, gameId, function (game) 
	{
		console.log(game.currentTurn)

		playersCard = req.body.card
		var valid = checkValidCard(playersCard, game)
		if (valid.valid)
		{
			if (playersCard.color == 'black')
			{
				game.stack.num = playersCard.num
				game.stack.color = playersCard.newColor
			}
			else{
				game.stack.num = playersCard.num
				game.stack.color = playersCard.color

			}
			// console.log(game.stack)
			// console.log(game.hand[game.currentTurn])
			var hands = game.hand
			hands[game.currentTurn].cards.splice(valid.index, 1)
			game.hand = hands
			// console.log("this is a test to see if the function updateGame is being called")
			game.currentTurn += game.turnIncrement
			if(game.currentTurn >= game.players)
			{
				game.currentTurn = 0
			}
			if (game.hand[game.currentTurn].cards.length  <= 0)
			{
				game.gameOver = true
				if (game.currentTurn ==0)
				{
					game.winner = true

				}
			}
			game.save(function (err)
			{
				if(err) return reportError(err, res)
				res.json(game)

				// res.json(game)
			})
			// takeAiTurn(game)
			// console.log(game.hand.indexOf(playersCard))
			

		}
		else {
			reportError({name:"ImproperCardError",message:"That card is not in the current players hand"}, res)

		}
	})
}

function checkValidCard(playersCard, game)
{
	var validCardInStack = false
	if (playersCard.color == game.stack.color || playersCard.num == game.stack.num || playersCard.color == "black")
	{
		validCardInStack = true
	}
	var validCardInHand = false
	var indexOfCard = -1
	for (cardIndex in game.hand[game.currentTurn].cards)
	{
		if (game.hand[game.currentTurn].cards[cardIndex].color === playersCard.color && game.hand[game.currentTurn].cards[cardIndex].num == playersCard.num)
		{
			validCardInHand = true
			indexOfCard  = cardIndex
			break
		}
	}
	return {index:indexOfCard, valid:validCardInHand && validCardInStack}
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


function findGame (req, res, gameId, success) {
	Game.findById(gameId, function (err, game) {
		if (err) return reportError(err, res)
		if (!game) {
			res.status(404).json({
				error:'Could not find game with that ID'
			})
		} else {
			success(game)
		}		
	})
}

function reportError(err, res) {
	if (err.name === "ValidationError") {
		res.status(422).json({
			error: err.message
		})
	} else if (err.name === "ImproperCardError")
	{
		res.status(422).json({
		error: err.message
		}).end()
	}
	else {
		console.trace()
		res.status(422).json(err)
	}
}