const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    nameActivity: { type:String, required:true},
    imgActivity: {type:String, required:true},
    intineraryID:{type: mongoose.Types.ObjectId , ref : 'intineraries'}
})

const Activity = mongoose.model('activities', activitySchema)
module.exports=Activity