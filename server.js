const express = require('express')
const dotenv = require('dotenv')
const conenectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
// const MongoStore = require('connect-mongo')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passprt')(passport)

// Connect to db
conenectDB()

// Getting app from express
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging to console exttr info if dev mode - http method, response...
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars helpers
const { formatDate, stripTag, truncate, editIcon } = require('./helpers/hbs')

// Handlebars 
app.engine('.hbs', exphbs({
    helpers: {
        formatDate, stripTag, truncate, editIcon
    },
    defaultLayout: 'main', extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    // store: MongoStore.create({ session })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global variables
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folders
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
