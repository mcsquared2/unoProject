var Game = require('./model');
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
		if (game.currentTurn == 0)
		{
			game.hand[game.currentTurn].cards.push(createCard())
			game.currentTurn = nextPlayer(game.currentTurn, game.turnIncrement, game.players)

			game.save(function (err)
			{
				if (err) return reportError(err, res)
				res.json(game)
			})
		}
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
	// console.log(gameId)
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
			playersCard = (aiTurn(game.hand[game.currentTurn].cards, game.stack))
			console.log("this is playersCard " + playersCard)
			// playersCard = aiTurn(testHandForWilds, game.stack)
			
		}
		console.log("current Card " + playersCard)
		if (playersCard)
		{

			var valid = checkValidCard(playersCard, game)
			console.log("is the card valid " + JSON.stringify(valid))
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
				if (game.hand[game.currentTurn].cards.length  <= 0)
				{
					game.gameOver = true
					if (game.currentTurn ==0)
					{
						game.winner = true

					}
				}
				else{
					bestCards(playersCard.num, game)

					// game.hand[game.currentTurn].cards = hand
					// console.log(game.hand[game.currentTurn].cards)
					// console.log("this is a test to see if the function updateGame is being called")
					game.currentTurn = nextPlayer(game.currentTurn, game.turnIncrement, game.players)
					console.log("currentHand " + game.hand[game.currentTurn])
				}
				console.log(game.stack)
				// console.log(playersCard)
				game.save(function (err)
				{
					if(err) return reportError(err, res)
					console.log(game)
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

function bestCards(num, game)
{
	switch (num) 
	{
		case 14:
			
			for (var i =0; i< 4; i++)
			{
				var possibleNextPlayer = nextPlayer(game.currentTurn, game.turnIncrement, game.players)
				game.hand[possibleNextPlayer].cards.push(createCard())
			}
			game.currentTurn = nextPlayer(game.currentTurn, game.turnIncrement, game.players)

			break
		case 12:
			game.currentTurn = nextPlayer(game.currentTurn, game.turnIncrement, game.players)
			break;
		case 11:
			for (var i =0; i< 2; i++)
			{
				var possibleNextPlayer = nextPlayer(game.currentTurn, game.turnIncrement, game.players)
				game.hand[possibleNextPlayer].cards.push(createCard())
			}
			game.currentTurn = nextPlayer(game.currentTurn, game.turnIncrement, game.players)

			break
		case 10:
			game.turnIncrement *= -1
			break
		default:
			// do nothing
	}

}

function nextPlayer(currentTurn, increment, players) 
{
	currentTurn += increment
	if (currentTurn >= players)
	{
		currentTurn = 0
	}
	else if (currentTurn <= -1)
	{
		currentTurn = players - 1
	}
	return currentTurn
}

function aiTurn (hand, stack)
{
	var colorList = findSimilar(hand, stack.color, 'color')
	console.log("this is our colorList " + colorList)
	if (colorList.length > 0)
	{
		return colorList[Math.floor(Math.random() * colorList.length)]
	}
	else {
		var numbers = findSimilar(hand, stack.num, 'num')
		console.log("this is numbers " + numbers)
		if (numbers.length > 0)
		{
			// console.log("returning " + numbers)
			return numbers[Math.floor(Math.random() * numbers.length)]

		}
		else {
			console.log("we are in wild logic")
			var wilds = findWilds(hand)

			if (wilds.length > 0)
			{
				// var greatestCol = 0
				console.log("this is colors" + colors)
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

				var w = wilds[Math.floor(Math.random() * wilds.length)]
				console.log("this is the new color" + newCol)
				w.newColor = newCol
				console.log("this is w " + w)
				
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
	if (playersCard.color == game.stack.color || playersCard.num == game.stack.num || (playersCard.color == "black" && playersCard.newColor))
	{
		validCardInStack = true
	}
	var validCardInHand = false
	var indexOfCard = -1
	for (cardIndex in game.hand[game.currentTurn].cards)
	// for (cardIndex in testHandForWilds)
	{
		console.log(game.hand[game.currentTurn].cards[cardIndex]._id, playersCard._id)
		if (String(game.hand[game.currentTurn].cards[cardIndex]._id) === String(playersCard._id))
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