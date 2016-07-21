'use strict';


var React = require('react');
var Card = require('../../Card');
var GameActionCreator = require("../../actions/GameLogicActionCreator");



var Hand = React.createClass({

	
	render: function() {
		// console.log(this.props.select)
		var hand = this.props.game.hand[0].cards
		var output;
		var buttonContent;
		var createCard = function (card) {
			return (
				<Card 
					color={card.color}
					num={card.num}
					key={card._id}
					select={this.props.select}
					
				/>
			)
		}
		;
		// console.log(this.props.game)
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
			<div>
				<div onClick={this.props.update} className="buttn">
					{buttonContent}
				</div>
				<div>
					<p>It is {this.props.game.currentTurn}'s turn</p>
				</div>
				<div className="footer">
					<div className="footer-child">
						{output}
						
						<img className="small" onClick={this.props.draw} src="images/images/draw.png" />
						

					</div>
				</div>
			</div>
		)
	}

});

module.exports = Hand;