'use strict';


var React = require('react'); 

var Card = React.createClass({

	render: function() {
		var classes = "card " + this.props.color + this.props.size;
		return (
			<div className={classes}>
				<span className='inner'>
					<span className="mark">{this.props.num}</span>
				</span>
			</div>

		);
	}

});

module.exports = Card;