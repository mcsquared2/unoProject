'use strict';
 
var Dispatcher = require('../dispatcher/Dispatcher');
// var todoApi = require('../mockApi/todoApi');
var API = require('../helpers/api');
var ActionTypes = require('../constants/actionTypes');

var GameLogicActionCreator = {
	initializeApp: function() {
		var todoPromise = API.getGame()
		todoPromise
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
	}
};

module.exports = InitializeGameActionCreator;