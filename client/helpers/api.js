'use strict';

var ajax = require('./ajax');

module.exports = {
	getGame: getGame,
	createGame: createNewGame,
	deleteGame: deleteGame,
	playCard: playCardFromHand,
	draw: drawCard
}

function getGame (gameid) {
	var url = '/game/' + gameid;
	var data = {};
	var type = 'GET';

	return ajax(url, data, type);
}

function createGame (player) {
	var url = '/player/' + player._id;
	var data = {};

	return ajax(url, data);
}

function deleteTodo (player) {
	var url = '/game/' + player._id;
	var data = {};
	var type = 'DELETE';

	return ajax(url, data, type);
}

function playCardFromHand (gameid) {
	var url = '/game/' + gameid;
	var data = {};
	var type = 'PUT';

	return ajax(url, data, type);
}

function drawCard (gameid) {
	var url = '/game/draw/' + gameid;
	var data = {};
	var type = 'PUT';

	return ajax(url, data, type);
}
