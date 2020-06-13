const express = require('express')
const path = require('path')
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const directoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(directoryPath))

console.log(__dirname)
console.log(__filename)

// app.get('', (req, res)=> {
//     res.send('Hello!! This is express.')
// })


app.get('',(req, res)=>  {
    res.render('index', {
        title:'Weather App',
        name:'Dhiren'
    })
})


app.get('/about',(req, res)=>  {
    res.render('about', {
        place:'New Delhi',
        name:'Dhiren',
        title: 'About'
    })
})

app.get('/help',(req, res)=>  {
    res.render('help', {
        number:'9971296700',
        name:'Dhiren',
        title:'Help'
    })
})


app.get('/weather', (req,res)=>{
    if(!req.query.location){
        return res.send({
            error:'Please provide a location'
        })
    }
    geocode(req.query.location, (error, body)=> {
        if(error){
            return res.send({error})
        }
        forecast(body.features[0].center[1], body.features[0].center[0] , (error, forecastData)=> {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                longitude: body.features[0].center[1],
                lattitude: body.features[0].center[0],
                address: req.query.location
            })
        })
    })
    
})

app.get('/help/*', (req, res)=> {
    res.render('error',{
        title:'Help article not found',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res)=> {
    res.render('error',{
        title:'Page not found',
        errorMessage: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Congrats!! Server is up and running')
})