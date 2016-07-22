'use strict';


var React = require('react'); 

var AI = React.createClass({
	render: function() {
		// console.log(this.props.amtOfCards)
		var source = '';
		if (this.props.amtOfCards > 1) {
			source = "images/images/unohand.png"
		}
		else {
			source = "images/images/unocardcopy.png"
		}
		return (
			<div id={this.props.id}>
				<img className="aiIcon" src={source} />
				{this.props.amtOfCards}
			</div>

		);
	}

});

module.exports = AI;