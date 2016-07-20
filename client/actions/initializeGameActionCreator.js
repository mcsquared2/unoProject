'use strict';
 
var Dispatcher = require('../dispatcher/Dispatcher');
// var todoApi = require('../mockApi/todoApi');
var API = require('../helpers/api');
var ActionTypes = require('../constants/actionTypes');

var InitializeGameActionCreator = {
	initializeApp: function() {
		var gamePromise = API.getGame()
		gamePromise
			.then( function (game) {
				Dispatcher.dispatch({
					actionType: ActionTypes.INITIALIZE,
					initialData: {
						game: game
					}
				})
			})
			.fail(function (xhr, status, err) {
				console.log('Get Game Failed!')
			});
		var playerPromise = API.getPlayer()
		playerPromise
			.then( function (player) {
				Dispatcher.dispatch({
					actionType: ActionTypes.INITIALIZE,
					initialData: {
						player: player
					}
				})
			})
			.fail(function (xhr, status, err) {
				console.log('Get Game Failed!')
			});
	}
};

module.exports = InitializeGameActionCreator;