var mongoose = require('mongoose')

var GameSchema = new mongoose.Schema({
	stack: {
		color:{type:String, required:true},
		num:{type:Number, required:true} 
	},
	hand: [{
		color:String, 
		num:Number
	}],
	winner: {type:Boolean, default: false},
	gameOver: {type:Boolean, default:false} 
})

module.exports = mongoose.model('Game', GameSchema);