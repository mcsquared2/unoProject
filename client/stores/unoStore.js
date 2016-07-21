'use strict';


var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events');
var CHANGE_EVENT = 'change';
var _ = require('lodash');
// var GameActionCreator = require("../../actions/GameLogicActionCreator");
// var toastr = require('toastr');

var _player = null
var _game = null;

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

	getGame: function () {
		return _game;
	},

	getPlayer: function() {
		return _player;
	}

});

Dispatcher.register(function (action) {
	switch (action.actionType) {
		case ActionTypes.INITIALIZE:
			_player = action.initialData.player;
			_game = action.initialData.game;
			break;
		case ActionTypes.NEW_GAME:
			_game = action.game
			UnoStore.emitChange()
			break;
		case ActionTypes.UPDATE_GAME:
			_game = action.game
			UnoStore.emitChange()
			break;
		case ActionTypes.DELETE_GAME:
			_game=null
			UnoStore.emitChange()
			break;
		default:
			// do nothing
	}
})

module.exports = UnoStore;