'use strict';


var React = require('react'); 
var toastr = require('toastr')

var Card = React.createClass({
	colors:['red', 'blue','green','yellow'],
	getInitialState: function () {
		return {
			selected:false,
			id: '' 
		}	
	},

	
	render: function() {
		// console.log("%%" + JSON.stringify(this.props.card))
		// console.log("this card is selected when " + this.state.selected)
		var object = ''
		if (this.props.image) 
		{
			object = (
				<img src={this.props.image} className="icon" />
			)
		}
		else {
			object = this.props.num;
		}
		var classes = "card " + this.props.color + ' ' + this.props.size + ' ' + this.props.mainpagecardcss;
		var click = function() {
			console.log(this.props.currentTurn)
			if (this.props.currentTurn == 0)
			{
				// console.log("we are in the click function")

				this.state.selected = !this.state.selected
				// console.log(this.state.selected)
				// console.log(typeof this.props.select)
				if (this.state.selected)
				{
					// console.log(this.props.card)
					this.props.card.newColor = this.colors[Math.floor(Math.random() * this.colors.length)]
					this.state.selected = this.props.select(this.props.card);
					if (this.state.selected == false)
					{
						toastr.error("You already have a card selected")
					}
					

				}
				else {
					this.props.select(null)
				}
			}
			
		}.bind(this);
		// console.log(this.props.select)
		var classes = "card " + this.props.color + ' ' + this.props.size ;
		if (this.state.selected)
		{
			this.state.id = 'selected'
		}
		else {
			this.state.id = ''
		}
		var specialCard = '';
		if (this.props.num > 9)
		{
			switch (this.props.num)
			{
				case 10:
					specialCard = "images/images/UnoCons/" + this.props.color + "reverse.png"
					object = (<img src={specialCard} className="icon" />)
					break;
				case 11:
					specialCard = "images/images/UnoCons/drawtwo" + this.props.color + ".png"
					object = (<img src={specialCard} className="icon" />)

					break;
				case 12:
					specialCard = "images/images/UnoCons/" + this.props.color + "skip.png"
					object = (<img src={specialCard} className="icon" />)

					break;
				case 13:
					specialCard = "images/images/UnoCons/wild.png"
					object = (<img src={specialCard} className="icon" />)

					break;
				case 14:
					specialCard = "images/images/UnoCons/drawfour.png"
					object = (<img src={specialCard} className="icon" />)

					break;
				default:
			}
		}
		// console.log(classes)
		return (
			<div className={classes} onClick={click} id={this.state.id}>
				<span className='inner'>
					<span className="mark">{object}</span>
				</span>
			</div>

		);
	}

});

module.exports = Card;