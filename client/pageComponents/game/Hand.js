'use strict';


var React = require('react');
var Card = require('../../Card');


var Hand = React.createClass({
	render: function() {
		var output;
		var createCard = function (card) {
			return (
				<Card 
					color={card.color}
					num={card.num}
					anotherClass="test"
				/>
			)
		};
		// console.log(this.props.game)

		if (this.props.game.hand.length > 0) {
			output = this.props.game.hand.map(createCard, this)
		}
		else {
			output = (<p>You have no cards! You win!</p>)
		}
		return (
			<div className="footer">
				{output}
			</div>
		)
	}

});

module.exports = Hand;