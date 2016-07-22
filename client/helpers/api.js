'use strict';

var ajax = require('./ajax');

module.exports = {
	createPlayer: createNewPlayer,
	getGame: getGame,
	createGame: createNewGame,
	deleteGame: deleteGame,
	playCard: playCardFromHand,
	draw: drawCard
}

function createNewPlayer (profile) {
	var url = "/profile/";
	var data = profile

	return ajax(url, data)
}

function getGame (gameid) {
	var url = '/game/' + gameid;
	var data = {};
	var type = 'GET';

	return ajax(url, data, type);
}

function createNewGame (player, numOfPlayers) {
	console.log(player, numOfPlayers)
	var url = '/game/' + player;
	var data = {players:numOfPlayers};

	return ajax(url, data);
}

function deleteGame (player) {
	var url = '/game/' + player._id;
	var data = {};
	var type = 'DELETE';

	return ajax(url, data, type);
}

function playCardFromHand (gameid, card) {
	console.log("this is " + JSON.stringify(card))

	var url = '/game/' + gameid;
	var data = {card:card};
	var type = 'PUT';
	

	return ajax(url, data, type);
}

function drawCard (gameid) {
	var url = '/game/draw/' + gameid;
	var data = {};
	var type = 'PUT';

	return ajax(url, data, type);
}
