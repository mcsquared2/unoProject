'use strict';

var React = require('react'); 
var Hand = require('./game/Hand');
var CardPit = require("./game/CardPit");
var GameStore = require('../stores/unoStore');
var GameActionCreator = require("../actions/GameLogicActionCreator");
var InitializeGameActionCreator = require('../actions/initializeGameActionCreator');
var UnoStore = require("../stores/unoStore");




var mainGame = React.createClass( {
	draw: function ()
	{
		GameActionCreator.drawCard(this.state.game._id)
	},
	update: function () {
		GameActionCreator.update(this.state.game._id, this.state.selectedCard, this.state.game.turn)
		this.state.selectedCard = undefined
	},
	getInitialState : function () {

		return {
			player: GameStore.getPlayer(),
			game: GameStore.getGame(),
			selectedCard: undefined
			
		}
	},
	select: function (card) {
		console.log("this card is selectedCard " + this.state.selectedCard + " and this is card " + card)
		console.log(card && !this.state.selectedCard)
		var selld = false
		if ((card && !this.state.selectedCard) || (!card && this.state.selectedCard))
		{
			this.state.selectedCard = card
			console.log(this.state.selectedCard)	
			selld = true		
		}
		// console.log(this.state.selectedCard)
		UnoStore.emitChange()
		return selld
	},

	componentWillMount: function () {
		
		// console.log("this is the player " +this.state.player + "/n this is the game " + this.state.game)
		GameStore.addChangeListener(this.onChange);



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
				<CardPit
					game={this.state.game}
					draw={this.draw}
				/>
				<Hand
					game={this.state.game}
					draw={this.draw}
					select={this.select}
					update={this.update}
				/>
			</div>
		)
	}

});

module.exports = mainGame;