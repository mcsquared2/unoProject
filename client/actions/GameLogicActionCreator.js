'use strict';
 
var Dispatcher = require('../dispatcher/Dispatcher');
// var todoApi = require('../mockApi/todoApi');
var API = require('../helpers/api');
var ActionTypes = require('../constants/actionTypes');
var toastr = require('toastr');

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
			.fail(function (xhr, status, err) {
				console.log('Get Game Failed!')
			});
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
			.fail(function (xhr, status, err) {
				console.log('Get Game Failed!')
			});
	},

	update: function(gameId, card, turn)
	{
		console.log(turn)
		if (card || turn != 0)
		{
			var gamePromise = API.playCard(gameId, card);
			// console.log(gamePromise)
			gamePromise
				.then( function (game) {
					// console.log("here we are")
					Dispatcher.dispatch({
						actionType: ActionTypes.UPDATE_GAME,
						game: game
					})
				})
				.fail(function (xhr, status, err) {
					console.log('Get Game Failed!')
				});
		}
		else if(!card){
			toastr.error("There are no cards selected")
		}

	}
};

module.exports = GameLogicActionCreator;