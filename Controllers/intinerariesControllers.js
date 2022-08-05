const { findOne } = require('../models/intinerary')
const Intinerary = require('../models/intinerary')

const intinerariesControllers = {
    getIntineraries: async (req ,res)=> {
        let intineraries
        let error = null
        try{
            intineraries = await Intinerary.find()
        }catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : { intineraries },
            success: error ? false : true,
            error: error
        })
    },


    getOneIntinerary: async (req,res) => {
        const id = req.params.id
        let intinerary
        let error = null
        try{
            intinerary = await Intinerary.findOne({_id:id})
            .populate('activity')
        }catch(err){
            error = err
            console.log(err)
        }
        res.json({
            response: error ? 'ERROR' : intinerary,
            succes : error ? false : true,
        })
    },


    addIntinerary: async (req, res) => {
        const {name, person, image, description, price, duration, hashtags, likes, cityID}=req.body.data
        let intinerary
        let error = null
        try{
            intinerary= await new Intinerary({
                name:name,
                person:person,
                image:image,
                description: description,
                price: price,
                duration: duration,
                hashtags: hashtags,
                likes: likes,
                cityID: cityID
            }).save()
        }catch(err){error = err}
        res.json({
            response: error ? 'ERROR' : intinerary,
            succes: error ? false : true,
            error: error
        })
    },


    modifyIntinerary: async (req, res) => {
        const id = req.params.id
        const intinerary = req.body.data
        let intinerarydb
        let error = null
        try {
            intinerarydb = await Intinerary.findOneAndUpdate({ _id:id }, intinerary,{ new: true})
        } catch(err){ error = err }
        res.json({
            response: error ? 'ERROR' : intinerarydb,
            succes: error ? false : true,
            error: error
        })
    },



    removeIntinerary: async (req, res) => {
        const id = req.params.id
        let intinerary
        let error = null
        try {
            intinerary = await Intinerary.findOneAndDelete({_id:id})
        } catch(err) {error = err}     
        res.json({
                response: error ? 'ERROR' : Intinerary ,
                succes: error ? false : true,
                error: error
            })
        },

        
        multiplesIntinerary: async (req, res) => {
            let intinerary= []
            const data = req.body.data
            let error = null
            try {
                data.map(async (item) => {
                    await new Intinerary({
                        name: item.name,
                        person: item.person,
                        image: item.image,
                        description: item.description,
                        price: item.price,
                        duration: item.duration,
                        hashtags: item.hashtags,
                        likes: item.likes,
                        cityID: item.cityID
                    }).save()
                })
            } catch (err) { error = err }
            intinerary = await Intinerary.find()
            res.json({
                response: error ? 'ERROR' : intinerary,
                success: error ? false : true,
                error: error
            })
        },
        getItinerariesByCity: async (req,res) => {
            const id = req.params.id //creamos una referencia, resq=id. resq es la respuesta del send
            
            let intineraries
            let error = null
            try {
                intineraries = await Intinerary.find({cityID : id}) //la referenciamos con find, el modelo de mongo = id de resq
                .populate('activity', 'nameActivity')

                
            } catch (err) {
                error = err
            }
            res.json({
                console: console.log(error),
                response: error ? 'ERROR' : intineraries,
                success: error ? false : true,
                error: error
            })
        },

        likeDislike: async (req,res) => {
            //console.log(req)
            let intineraryId = req.params.id 
            let user = req.user.id
            //console.log(user)
            try { 
                let intinerary = await Intinerary.findOne({_id:intineraryId}) 
                if (intinerary.likes.includes(user)) {
                    Intinerary.findOneAndUpdate({_id:intineraryId}, {$pull:{likes:user}}, {new:true})
                        .then(response => res.json({
                            response: response.likes, 
                            success: true
                        }))
                        .catch(error => console.log(error))
                } else {
                    Intinerary.findOneAndUpdate({_id:intineraryId}, {$push:{likes:user}}, {new:true})
                        .then(response => res.json({
                            response: response.likes, 
                            success: true
                        }))
                        .catch(error => console.log(error))
                }
            } catch (error) {
                res.json({
                    response: error,
                    success: false
                })
            } 
        }
        
    }



module.exports = intinerariesControllers