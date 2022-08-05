const mongoose = require ('mongoose')

const IntineraryShema = new mongoose.Schema({
    name:{type:String, require:true},
    person:{type:String, require:true},
    image:{type:String, require:true},
    description:{type:String, require:true},
    price: {type:String, required:true},
    duration: {type:String, required:true},
    hashtags: {type:Array, required:true},
    activity: [{type: mongoose.Types.ObjectId, ref:'activities'}], 
    likes: {type:Array},
    cityID:{type: mongoose.Types.ObjectId , ref : 'cities'},
    comments: [{
        comment: {type: String},
        userId: {type:mongoose.Types.ObjectId, ref:'users'}
    }]
})
const Intinerary= mongoose.model('intineraries', IntineraryShema)
module.exports = Intinerary