var mongoose = require("mongoose")

var PlayerSchema = new mongoose.Schema ({
	
	gameId: {type:String, default: null},
	profile: {
		username: {type:String, default:"guest"},
		password: {type:String, default:"chickitychinathechinesechicken"},
		wins: 0,
		losses:0,
		name: {type:String},
		email: {type:String}
	}
})

module.exports = mongoose.model("player", PlayerSchema)