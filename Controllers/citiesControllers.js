const City = require('../models/city')

const citiesControllers = {
    getCities: async (req ,res)=> {
        let cities
        let error = null
        try{
            cities= await City.find()
        }catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : { cities },
            success: error ? false : true,
            error: error
        })
    },


    getOneCities: async (req,res) => {
        const id = req.params.id
        let city
        let error = null
        try{
            city = await City.findOne({_id:id})
        }catch(err){
            error = err
            console.log(err)
        }
        res.json({
            response: error ? 'ERROR' : city,
            succes : error ? false : true,
        })
    },


    addCities: async (req, res) => {
        const {name,country,image,description}=req.body.data
        let city
        let error = null
        try{
            city = await new City({
                name:name,
                country:country,
                image: image ,
                description:description
            }).save()
        }catch(err){error = err}
        res.json({
            response: error ? 'ERROR' : city,
            succes: error ? false : true,
            error: error
        })
    },


    modifyCities: async (req, res) => {
        const id = req.params.id
        const city = req.body.data
        let citydb
        let error = null
        try {
            citydb = await City.findOneAndUpdate({ _id:id }, city,{ new: true})
        } catch(err){ error = err }
        res.json({
            response: error ? 'ERROR' : citydb,
            succes: error ? false : true,
            error: error
        })
    },


    removeCities: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await City.findOneAndDelete({_id:id})
        } catch(err) {error = err}     
        res.json({
                response: error ? 'ERROR' : city,
                succes: error ? false : true,
                error: error
            })
        },

        
        multiplesCities: async (req, res) => {
            let city = []
            const data = req.body.data
            let error = null
            try {
                data.map(async (item) => {
                    await new City({
                        name: item.name,
                        country: item.country,
                        image: item.image,
                        description: item.description
                    }).save()
                })
            } catch (err) { error = err }
            city = await City.find()
            res.json({
                response: error ? 'ERROR' : city,
                success: error ? false : true,
                error: error
            })
        },
    }



module.exports = citiesControllers