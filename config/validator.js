const joi = require('joi')

const validator = (req, res, next) => {
    console.log("req.body es")
    console.log(req.body)
    const schema = joi.object({
        nameUser: joi.string()
            .min(3)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'name: min 3 characters',
                'string.max': 'name: max 20 characters'}),
        lastNameUser: joi.string()
            .min(3)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': '"last name": min 3 characters',
                'string.max': '"last name": max 20 characters'}),
        mail: joi.string()
            .email({minDomainSegments:2}) 
            .required()
            .messages({
                'string.mail': '"mail": incorrect format'}),
        country: joi.string()
            .min(0)
            .required(),
        photoUser: joi.string()
            .min(5)
            .trim()
            .required(),
        password: joi.string()
            .min(8)
            .max(50)
            .pattern(new RegExp('[a-zA-Z0-9]'))
            .required()
            .messages({
                'string.min': '"password": min 8 characters',
                'string.max': '"password": max 30 characters'}),
        from: joi.string()
            .required(),
            country: joi.string()
    })
    const validation = schema.validate(req.body, {abortEarly:false})
    if (validation.error) {
        return res.json({success: false, from: 'validator', message: validation.error.details, test: validation})
    }
    next()
}

module.exports = validator