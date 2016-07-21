'use strict';
 
var Dispatcher = require('../dispatcher/Dispatcher');
// var todoApi = require('../mockApi/todoApi');
var API = require('../helpers/api');
var ActionTypes = require('../constants/actionTypes');

var InitializeGameActionCreator = {
	initializeApp: function() {
		var guestProfile = {
			username: "guestProfile",
			password: "playforfree",
			email: '',
			name: ''
		}	
		var playerPromise = API.createPlayer(guestProfile)
		playerPromise
			.then( function (player) {
				var gamePromise = API.createGame(player._id, 4)
				gamePromise
				.then(function (game) {
					console.log(game)
					Dispatcher.dispatch({
						actionType: ActionTypes.INITIALIZE,
						initialData: {
							player: player,
							game:game
						}
					})
				})		
			})
			.fail(function (xhr, status, err) {
				console.log('Init Failed!')
			});
	}
};

module.exports = InitializeGameActionCreator;