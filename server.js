require('dotenv').config()
require('./config/database')
const express = require ('express')
const Router = require ('./routes/routes')
const PORT = process.env.PORT || 4000
const passport = require ("passport")
const app = express()
const cors = require('cors')

app.set('port', PORT)

app.get('/', (req, res) => {
    res.send('el servidor esta funcionando')
})
//middlewares
app.use(cors())
app.use(express.json())
app.use('/api', Router)
app.use(passport.initialize())


app.listen(app.get('port'), () => { console.log('Server ready on PORT: ' + app.get('port'));
});