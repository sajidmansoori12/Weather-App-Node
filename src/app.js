
// To run the code use node app.js -e otherwise the partials won't work

const path = require('path') // Inbuilt Module to manipulate paths
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
const forecast = require('./utils/forecast')


const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath)) // This will call index.html file by default so we don't need to give it's path
// app.use(express.static(path.join(publicDirectoryPath,'/help.html'))) // This will serve up the help.html page
// app.use(express.static(path.join(publicDirectoryPath,'/about.html'))) // This will serve up the about.html page

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs'); // To use hbs module to create handlebars (handlebars are used to serve up dynamic content )
app.set('views', viewsPath) // Used to change the default path for views / templates

hbs.registerPartials(partialsPath) // Setting hbs to use the partials

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'M Sajid Mansoori'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'M Sajid Mansoori',
        title: 'About me !'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'M Sajid Mansoori'
    })
})
app.get('/weather', (req, res) => {
    //Checking to see if address is provided in query string
    if(!req.query.address){
        return res.send({
            error:'You must provide an address to find the weather'
        })
    }
    
    forecast(req.query.address,(error,response)=>{
        if(error){
            res.send({
                error:`Cannot connect to the weather service`
            })
        }
        else{
            currentTemp = response.body.main.temp - 273.15
            
            res.send(
                {
                location : req.query.address,
                temp:`It is currently ` + Math.round(currentTemp) + ` degree celsius `,
                weather:`There are ` + response.body.weather[0].description+' in the area.'})
                }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404pagetemplate',{
        title:'404 Page',
        message:'Help Article Not Found !',
        name:'M Sajid Mansoori'

    })
})
app.get('*',(req,res)=>{
    res.render('404pagetemplate',{
        title:'404 Page',
        message:'Page Not Found',
        name:'M Sajid Mansoori'

    })
})

app.listen(port, () => {
    console.log('Server up and running at port '+port)
})