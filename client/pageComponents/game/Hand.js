'use strict';


var React = require('react');
var Card = require('../../Card');
var GameActionCreator = require("../../actions/GameLogicActionCreator");



var Hand = React.createClass({

	draw: function ()
	{
		GameActionCreator.drawCard(this.props.game._id)
	},
	render: function() {
		var hand = this.props.game.hand[0].cards
		var output;
		var buttonContent;
		var createCard = function (card) {
			return (
				<Card 
					color={card.color}
					num={card.num}
					
				/>
			)
		};
		console.log(this.props.game)
		if (this.props.game.currentTurn == 0)
		{
			buttonContent = "Play Card";
		}
		else {
			buttonContent = "Continue";

		}
		if (hand.length > 0) {
			output = hand.map(createCard, this)
		}
		else {
			output = (<p>You have no cards! You win!</p>)
		}
		return (
			<div className="footer">
				<div>
				{buttonContent}
				</div>
				<div className="footer-child">
					{output}
					
					<img className="small" onClick={this.draw} src="images/images/draw.png" />
					

				</div>
			</div>
		)
	}

});

module.exports = Hand;