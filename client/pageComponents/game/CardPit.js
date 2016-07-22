'use strict';


var React = require('react'); 
var AiIcon = require('./AI');
var Card = require('../../Card');


var CardPit = React.createClass({
	
	
	render: function() {
		var ais = []
		var content;
		var mapIter = 0
		for (var i = 1; i< this.props.game.hand.length; i++)
		{
			// console.log(this.props.game.hand[i])
			ais.push({len:this.props.game.hand[i].cards.length, id:i})
		}

		var createAiIcons = function (aiHand) {
			mapIter++
			return (
				<AiIcon
					amtOfCards={aiHand.len}
					key = {aiHand.id}
					id={"player"+mapIter}
				/>
			)
		}

		if (ais.length > 0)
		{
			content = ais.map(createAiIcons, this)
		}
		else {
			content = "there is an error: no ais can be found."
		}
		
		return (
			<div className="cardPit">
				{content}
				<Card
					color={this.props.game.stack.color}
					num={this.props.game.stack.num}
					classes={"stack"}

				/>
				<img src="images/images/draw.png" onClick={this.props.draw} className="small selector" id="drawPile" />
			</div>
		);


	}

});

module.exports = CardPit;