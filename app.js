const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', './templates/views')
hbs.registerPartials('./templates/partials')

app.get('/',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Me'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Hussam'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'Helpful text!',
        name: 'a name'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        res.send({error: 'Need an address to continue'})
        console.log({error: 'Need an address to continue'})
    }
    else{
        geocode(req.query.address, (err,{loc,loData,laData}={}) =>{
            if(err){
                console.log({error: err})
                res.send({error: err})
            }else{ 
                forecast(loData, laData, (err,{temp, feels_like, t_high, t_low}={})=>{
                    if(err){
                        console.log({error: err})
                        res.send({error: err})
                    }else{ 
                        console.log('Current temperature in '+ loc + ' is: '+ temp + '. It feels like: ' + feels_like + '.')
                        console.log('High is: '+t_high+', and low: ' + t_low)
                        res.send({
                        locationData: {
                            location: loc,
                            longitude: loData,
                            latitude: laData
                        },
                        tempData:{
                            current_temp: temp, 
                            feels_like: feels_like, 
                            high: t_high, 
                            low: t_low
                        }})
                    }
                })
            }
        })
    }
})


app.get('/help/*',(req, res)=> {
    res.status(404).render('error',{
        title: 'Help Error',
        errorMessage: '404 Page not found',
        name:'Hussam'
    })
})

app.get('*',(req, res)=> {
    res.status(404).render('error',{
        title: 'Error',
        errorMessage: '404 Page not found',
        name:'Hussam'
    })
})

app.listen(port, ()=>{
    console.log('Listening on port: ', port)
})