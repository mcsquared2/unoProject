'use strict';


var React = require('react'); 

var Card = React.createClass({
	colors:['red', 'blue','green','yellow'],
	getInitialState: function () {
		return {
			selected:false,
			id: '' 
		}	
	},

	
	render: function() {
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
			this.state.selected = !this.state.selected
			// console.log(this.state.selected)
			// console.log(typeof this.props.select)
			if (this.state.selected)
			{
				console.log({
						color:this.props.color,
						num:this.props.num,
						newColor:this.colors[Math.floor(Math.random() * this.colors.length)]
					})
				this.state.selected = this.props.select(
					{
						color:this.props.color,
						num:this.props.num,
						newColor:this.colors[Math.floor(Math.random() * this.colors.length)]
					});
				

			}
			else {
				this.props.select(null)
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