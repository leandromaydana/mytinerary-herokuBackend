const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendVerification = require('./sendVerification')
const jwt = require('jsonwebtoken')

const userControllers = {//hola//

    signUpUser: async (req,res) => {
        const {nameUser, lastNameUser, country, photoUser, mail, password, from } = req.body
        console.log(req.body)
        try {
            const user = await User.findOne({mail})
            const hashWord = bcryptjs.hashSync(password, 10)
            const verification = false 
            const uniqueString = crypto.randomBytes(15).toString('hex') 
            if (!user) { 
                const newUser = await new User({nameUser, lastNameUser, country, photoUser, mail, verification,
                    uniqueString: uniqueString,
                    password: [hashWord],
                    from: [from]})
                if (from === "signUpForm") { 
                    await newUser.save()
                    await sendVerification(mail, uniqueString)
                        res.json({
                            success: true, 
                            from: from,
                            message: `check ${mail} and finish your SIGN UP!`}) 
                } else { 
                    newUser.verification = true
                    await newUser.save()
                    res.json({
                        success: true, 
                        from: from,
                        message: `you've just signed up by ${from}! now LOG IN!`})
                }
            } else {
                if (user.from.indexOf(from) !== -1) { 
                    res.json({
                        success: false,
                        from: from,
                        message: `${mail} has been registered yet, please LOG IN!`})
                } else { 
                    user.password.push(hashWord)
                    user.from.push(from)
                    user.verification = true 
                    await user.save()
                    res.json({
                        success: true, 
                        from: from, 
                        message: `you are ready to SIGN UP!`}) 
                }
            }
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                from: from,
                message: error})
        }
    },

    signInUser: async (req, res) => {
        const {mail, password, from} = req.body
        try {
            const loginUser = await User.findOne({mail}) 
            if (!loginUser) { 
                res.json({
                    success: false,
                    from: 'no from',
                    message: `incorrect mail or password`})
            } else if (loginUser.verification) { 
                let checkedWord =  loginUser.password.filter(pass => bcryptjs.compareSync(password, pass))
                if (from === "signUpForm") { 
                    if (checkedWord.length>0) { 
                        const user = {
                            id: loginUser._id,
                            mail: loginUser.mail,
                            nameUser: loginUser.nameUser,
                            photoUser: loginUser.photoUser,
                            role: loginUser.role,
                            from: loginUser.from}
                        await loginUser.save()
                        const token = jwt.sign({...user}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                        res.json({
                            response: {token,user}, 
                            success: true, 
                            from: from, 
                            message: `welcome back ${user.nameUser}!`})
                    } else {
                        res.json({
                            success: false, 
                            from: from,  
                            message: `verify your password!`})
                    }
                } else { 
                    if (checkedWord.length>=0) { 
                        const user = { 
                            id: loginUser._id,
                            mail: loginUser.mail,
                            nameUser: loginUser.nameUser,
                            photoUser: loginUser.photoUser,
                            role: loginUser.role,
                            from: loginUser.from}
                        await loginUser.save()
                        const token = jwt.sign({...user}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                        res.json({
                            response: {token,user}, 
                            success: true, 
                            from: from, 
                            message: `welcome back ${user.nameUser}!`})
                    } else { 
                        res.json({
                            success: false, 
                            from: from,  
                            message: `verify your mail or password!`})
                    }
                }
            } else {
                res.json({
                    success: false,
                    from: from,
                    message: `validate your account`})
            }
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                from: from,
                message: 'ERROR'})
        }
    },

    verifyMail: async (req, res) => {
        const {string} = req.params
        const user = await User.findOne({uniqueString: string})
        if (user) {
            user.verification = true
            await user.save()
            res.redirect("http://localhost:3000")
        }
        else {res.json({
            success: false,
            message: `email has not account yet!`})
        }
    },

    signOut: async (req, res) => {
        console.log('signOut')
        console.log(req.body)
        const mail = req.body.mail
        const user = await User.findOne({mail})
        await user
        res.json({
            success: true,  
            message:`${mail}log out`})
    },

    verifyToken:(req, res) => {
        if (!req.err) {
        res.json({
            success: true,
            response: {
                id: req.user.id,
                mail: req.user.mail,
                nameUser: req.user.nameUser,
                photoUser:req.user.photoUser,
                from: "token"},
            message: "Hi! Welcome back "+req.user.nameUser}) 
        } else {
            res.json({
                success:false,
                message:"sign in please!"}) 
        }
    }

}

module.exports = userControllers