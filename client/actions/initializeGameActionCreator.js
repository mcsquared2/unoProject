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
				Dispatcher.dispatch({
					actionType: ActionTypes.INITIALIZE,
					initialData: {
						player: player,
					}
				})
			})
			.fail(function (xhr, status, err) {
				console.log('Get Game Failed!')
			});
		
	}
};

module.exports = InitializeGameActionCreator;