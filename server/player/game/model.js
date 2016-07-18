var mongoose = require('mongoose')

var GameSchema = new mongoose.Schema({
	stack: {
		color:{type:String, required:true},
		num:{type:Number, required:true} 
	},
	hand: [[{
		color:String, 
		num:Number
	}]],
	currentTurn: {type:Number, default:0},
	players: {type:Number, default:4},
	turnIncrement: {type:Number, default:1},
	winner: {type:Boolean, default: false},
	gameOver: {type:Boolean, default:false} 
})

module.exports = mongoose.model('Game', GameSchema);