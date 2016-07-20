var Game = require('./model')
// var Player = require('../player/model')

var colors= ['red', 'blue', 'green', 'yellow']

var testHandForWilds = [{color:'black', num:13},{color:'blue', num:3},{color:'blue', num:6}, {color:'red', num:0},]

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
	findGame(req, res, id, function (game)
	{
		
		game.hand[game.currentTurn].cards.push(createCard())
		game.currentTurn = nextPlayer(game.currentTurn, game.turnIncrement, game.players)
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
	var aiDraw = false
	var playersCard
	findGame(req, res, gameId, function (game) 
	{
		// console.log(game.currentTurn)
		// var game.hand[game.currentTurn].cards = game.game.hand[game.currentTurn].cards[game.currentTurn].cards
		// console.log(game.hand[game.currentTurn].cards)
		if (game.currentTurn == 0)
		{
			// console.log("we are in the players condition")

			playersCard = req.body.card		
		}
		else {
			// console.log("we are in the ai condition")
			playersCard = aiTurn(game.hand[game.currentTurn].cards, game.stack)
			// playersCard = aiTurn(testHandForWilds, game.stack)
			
		}
		console.log(playersCard)
		if (playersCard)
		{

			var valid = checkValidCard(playersCard, game)
			console.log(valid)
			if (valid.valid)
			{
				game.stack.num = playersCard.num

				if (playersCard.color == 'black')
				{
					game.stack.color = playersCard.newColor
				}
				else{
					game.stack.color = playersCard.color

				}

				// console.log(game.stack)
				// console.log(game.game.hand[game.currentTurn].cards[game.currentTurn])
				game.hand[game.currentTurn].cards.splice(valid.index, 1)
				// game.hand[game.currentTurn].cards = hand
				// console.log(game.hand[game.currentTurn].cards)
				// console.log("this is a test to see if the function updateGame is being called")
				// game.currentTurn = nextPlayer(game.currentTurn, game.turnIncrement, game.players)
				if (game.hand[game.currentTurn].cards.length  <= 0)
				{
					game.gameOver = true
					if (game.currentTurn ==0)
					{
						game.winner = true

					}
				}
				// console.log(game.stack)
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
		}
		else
		{
			// hand.push(createCard())
			game.hand[game.currentTurn].cards.push(createCard())

			game.currentTurn = nextPlayer(game.currentTurn, game.turnIncrement, game.players)
			game.save(function (err)
				{
					if(err) return reportError(err, res)
					res.json(game)

				})

		}
	})
}

function nextPlayer(currentTurn, increment, players) 
{
	currentTurn += increment
	if (currentTurn >= players)
	{
		currentTurn = 0
	}
	return currentTurn
}

function aiTurn (hand, stack)
{
	var colors = findSimilar(hand, stack.color, 'color')
	if (colors.length > 0)
	{
		return colors[Math.floor(Math.random() * colors.length)]
	}
	else {
		var numbers = findSimilar(hand, stack.num, 'num')
		console.log(numbers)
		if (numbers.length > 0)
		{
			console.log("returning " + numbers)
			return numbers[Math.floor(Math.random() * colors.length)]

		}
		else {
			console.log("we are in wild logic")
			var wilds = findWilds(hand)

			if (wilds.length > 0)
			{
				var greatestCol = 0
				var newCol = colors[Math.floor(Math.random() * colors.length)]
				// for (i in colors)
				// {
				// 	l = findSimilar(hand, colors[i], 'color').length
				// 	// console.log(l)
				// 	// console.log(greatestCol)
				// 	// console.log(colors[i])

				// 	if (l > greatestCol)
				// 	{
				// 		greatestCol = l
				// 		newCol = colors[i]
				// 	}
				// }

				w = wilds[Math.floor(Math.random() * colors.length)]
				w['newColor'] = newCol
				return w
			}
			else {
				return null
			} 
		}
	}
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
	// for (cardIndex in testHandForWilds)
	{
		if (game.hand[game.currentTurn].cards[cardIndex].color === playersCard.color && game.hand[game.currentTurn].cards[cardIndex].num == playersCard.num)
		// if (testHandForWilds[cardIndex].color === playersCard.color && testHandForWilds[cardIndex].num == playersCard.num)

		{
			validCardInHand = true
			indexOfCard  = cardIndex
			break
		}
	}
	return {index:indexOfCard, valid:validCardInHand && validCardInStack}
}

function findSimilar (hand, value, field) 
{
	var matches = []
	for (i in hand)
	{
		if (hand[i][field] === value)
		{
			matches.push(hand[i])
		}
	}
	console.log(matches)
	return matches

}

function findWilds(hand) 
{
	var matches = []
	for (i in hand)
	{
		if (hand[i].color === 'black')
		{
			matches.push(hand[i])
		}
	}
	console.log(matches)
	return matches
}


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
		console.trace()
	} else if (err.name === "ImproperCardError")
	{
		res.status(422).json({
		error: err.message
		}).end()
	}
	else {
		console.trace()
		res.status(400).json(err)
	}
}