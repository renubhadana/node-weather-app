const path = require('path')  // used to set paths for directory and  files
const express = require('express')
const hbs = require('hbs') // view engine used to render dynamic content 
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express Config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsLocation = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine
app.set('view engine', 'hbs')

// Setup views location
app.set('views', viewsLocation)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

// app.use(express.static(publicDirectoryPath+"/about.html"))
// app.use(express.static(publicDirectoryPath+"/help.html"))

app.get('', (req, res) => {
    res.render('index', {   // render used to render views
        title: "Home Page",
        name: "Renu"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Us Page!"
    })
})

app.get('/help', (req, res) => {
   res.render('help', {
       title: "This is help page!"
   })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: "Set address aparameter!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, Place} = {}) => {
        console.log(Place)
        if(error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({error})
            }        
            res.send({
                forecast: data,
                location: Place,
                address: req.query.address
            })
        })
    
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send("Please send search parameter!")  
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found.')
})

app.get('*', (req, res) => {
    res.send('This is 404 page.')
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})