'use strict';


var React = require('react'); 

var Card = React.createClass({


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
		return (
			<div className={classes}>
				<span className='inner'>
					<span className="mark">{object}</span>
				</span>
			</div>

		);
	}

});

module.exports = Card;