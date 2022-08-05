const Router = require('express').Router();
const citiesControllers = require('../Controllers/citiesControllers');
const {getCities, getOneCities, addCities, modifyCities, multiplesCities, removeCities} = citiesControllers
const intinerariesControllers = require('../Controllers/intinerariesControllers');
const {getIntineraries,  getOneIntinerary, addIntinerary, modifyIntinerary, multiplesIntinerary, removeIntinerary, getItinerariesByCity, likeDislike} = intinerariesControllers
const {signInUser,signUpUser, verifyMail,signOut,verifyToken} = require('../Controllers/userControllers')
const activitiesControllers = require('../Controllers/activityControllers')
const {getActivities, getOneActivity, getActivityByIntineray, addActivity, modifyActivity} = activitiesControllers
const validator = require('../config/validator');
const passport = require('../config/passport');
const commentControllers = require('../Controllers/commentControllers');
const {addComment,modifyComment,deleteComment}= commentControllers;


Router.route('/cities')
.get(getCities)
.post(addCities)

Router.route('/cities/:id')
.delete(removeCities)
.put(modifyCities)
.get(getOneCities)

Router.route("/multiplesCities")
.post(multiplesCities)

Router.route('/intineraries')
.get(getIntineraries)
.post(addIntinerary)

Router.route('/intineraries/:id')
.delete(removeIntinerary)
.put(modifyIntinerary)
.get(getOneIntinerary)

Router.route("/multiplesintineraries")
.post(multiplesIntinerary)

Router.route('/itinerarybycity/:id')
.get(getItinerariesByCity)

Router.route('/auth/signUp')
.post(validator,signUpUser)

Router.route('/auth/signIn')
.post(signInUser)

Router.route('/verify/:string')
.get(verifyMail)

Router.route('/auth/signOut')
.post(signOut)

Router.route('/auth/loginToken')
.get(passport.authenticate('jwt', {session:false}), verifyToken)

Router.route("/activity")
.get(getActivities)
.post(addActivity)

Router.route('/activity/:id')
.put(modifyActivity)

Router.route("/getactivitybyintineray/:id")
.get(getActivityByIntineray)

Router.route('/intineraries/likeDislike/:id')
.put(passport.authenticate('jwt', {session:false}), likeDislike)

Router.route('/intineraries/comment')
.post(passport.authenticate('jwt', {session: false}), addComment)

Router.route('/intineraries/comment/:id')
.post(passport.authenticate('jwt', {session: false}), deleteComment)
.put(passport.authenticate('jwt', {session: false}), modifyComment)

module.exports = Router