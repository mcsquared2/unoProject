'use strict';

var React = require('react'); 
var Hand = require('./game/Hand');
var GameStore = require('../stores/unoStore');
var GameActionCreator = require("../actions/GameLogicActionCreator");
var InitializeGameActionCreator = require('../actions/initializeGameActionCreator');




var mainGame = React.createClass( {
	getInitialState : function () {

		return {
			player: GameStore.getPlayer(),
			game: GameStore.getGame()
			
		}
	},

	componentWillMount: function () {
		
		// console.log("this is the player " +this.state.player + "/n this is the game " + this.state.game)
		GameStore.addChangeListener(this.onChange);



	},

	componentDidMount: function () {
		if (!this.state.player)
		{
			InitializeGameActionCreator.initializeApp();

		}
		if (this.state.player.gameId)
		{
			GameActionCreator.getGame(this.state.player.gameId)
		}
		else {
			GameActionCreator.addNewGame(this.state.player._id)
		}
	},

	onChange: function () {
		this.setState({
			game:GameStore.getGame()
		})
	},

	componentWillUnmount : function () {
		GameStore.removeChangeListener(this.onChange)
	},



	render: function() {
		return (
			<div className="gametable">
				<div className="card-pit">
				<h1>UNO!</h1>

				</div>
				<Hand
					game={this.state.game}
				/>
			</div>
		)
	}

});

module.exports = mainGame;