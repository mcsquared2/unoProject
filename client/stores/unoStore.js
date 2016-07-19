'use strict';


var Dispatcher = require('../distacher/Dispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events');
var CHANGE_EVENT = 'change';
var _ = require('lodash');
var toastr = require('toastr');

var playerHand = [];

var UnoStore = Object.assign({}, EventEmitter.prototype, {

	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	getPlayerHand: function () {
		return playerHand;
	}

});

Dispatcher.register(function (action) {
	switch (action.actionType) {
		case ActionTypes.NEW_GAME:
			break;
		case ActionTypes.DRAW_CARD:
			break;
		case ActionTypes.PLAY_CARD:
			break;
		case ActionTypes.DELETE_GAME:
			break;
		default
			// do nothing
	}
})