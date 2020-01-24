console.log('Weather app is running')

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

//to use static files in public folder use path.join()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//console.log(publicDirectory)

//set up handle bars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akshita'

    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Node',
        name: 'Akshita'
    })

})

app.get('/help',(req,res) => {
    res.render('help', {
        msg: 'Please check the directory!!',
        title: 'help',
        name: 'Akshita'
    })
})


//get('url', (req,res)) to accept user request and send back a response
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

//app.com/help
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Akshita',
//         age: 22
//     })
// })

//app.com/about
// app.get('/about', (req,res) => {
//     res.send('<h2>About Us</h2>')
// })

//app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must enter the country name '
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location}) => {
        if(error)
           return res.send({error})
    
  
       forecast(latitude, longitude, (error, foreCastData) => {
           if(error){
               return res.send({error})
           }

           res.send({
               forecast : foreCastData,
               location,
               address: req.query.address
           })

       })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    
        res.send({
        products: []
    })

})


app.get('/help/*', (req, res) => {
    res.render('error',{
        title: 404,
        namer:'Akshita',
        errMsg: 'Help article not found'
    })
})

//matches routes that aren't listed
app.get('*',(req,res) => {
    res.render('error',{
        errMsg: 'Page not found',
        title: 404,
        name: 'Akshita'
    })
})

//to start the server use listen(port no., function)
app.listen(port, () => {
    console.log('Server is up on port '+ port)
})