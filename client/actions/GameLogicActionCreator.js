'use strict';
 
var Dispatcher = require('../dispatcher/Dispatcher');
// var todoApi = require('../mockApi/todoApi');
var API = require('../helpers/api');
var ActionTypes = require('../constants/actionTypes');

var GameLogicActionCreator = {
	addNewGame: function(playerId) {
		console.log('this is the action creator')


		var gamePromise = API.createGame(playerId, 4)

		// console.log('this is the action creator again')
		// console.log(gamePromise)}

		gamePromise
			.then( function (game) {
				console.log('this is inside the promise')
				Dispatcher.dispatch({
						actionType: ActionTypes.NEW_GAME,
						game: game
					})
			})
			.fail(function (xhr, status, err) {
				console.log('Get Game Failed!')
			});
	},

	drawCard: function (gameId) {
		var gamePromise = API.draw(gameId);

		gamePromise
			.then( function (game) {
				Dispatcher.dispatch({
					actionType: ActionTypes.UPDATE_GAME,
					game: game
				})
			})
	},

	getGame: function(gameId) {
		var gamePromise = API.getGame(gameId);

		gamePromise
			.then( function (game) {
				Dispatcher.dispatch({
					actionType: ActionTypes.UPDATE_GAME,
					game: game
				})
			})
	}
};

module.exports = GameLogicActionCreator;