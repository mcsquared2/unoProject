'use strict';

var React = require('react'); 
var Hand = require('./game/Hand');


var mainGame = React.createClass( {
	getInitialState : function () {
		return {
			game: {
				hand: [
					{color:'blue', num:9},
					{color:'yellow', num:8},
					{color:'red', num:7},
					{color:'black', num:13},
					{color:'green', num:5},
					{color:'blue', num:10},
					{color:'black', num:14},
					{color:'blue', num:12},
					{color:'blue', num:11}
					]
			}
		}
	},



	render: function() {
		return (
			<div className="gametable">
				<div className="card-pit">
				<h1>UNO!</h1>

				</div>
				<Hand
					game={this.state.game}
				/>
			</div>
		)
	}

});

module.exports = mainGame;