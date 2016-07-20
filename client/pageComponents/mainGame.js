'use strict';

var React = require('react'); 
var Hand = require('./game/Hand');
var GameStore = require('../stores/unoStore');


var mainGame = React.createClass( {
	getInitialState : function () {
		return {
			game: GameStore.getGame()
			}
		}
	},

	componentWillMount: function () {
		GameStore.addListener(this.onChange)
	},

	onChange: function () {
		this.setState({
			game:GameStore.getGame()
		})
	}

	componentWillUnmount : function () {
		GameStore.removeListener(this.onChange)
	}



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