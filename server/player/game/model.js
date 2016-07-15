var mongoose = require('mongoose')

var GameSchema = new mongoose.Schema({
	stack: {color:String, num:Number, required:true},
	hand: [{
		color:String, 
		num:Number
	}],
	winner: {type:Bolean, default: true}
	gameOver: {type:Boolean, default:true} 
})

module.exports = mongoose.model('Game', GameSchema);