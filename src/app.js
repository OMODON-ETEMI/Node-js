const path = require('path')
const express = require('express')
const hbs = require('hbs')
const goecode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const PublicDir = path.join(__dirname, '../public')
const ViewDir = path.join(__dirname, '../template/views')
const PartialsDir = path.join(__dirname, '../template/partials')
app.set('view engine', 'hbs')
app.set('views', ViewDir)
hbs.registerPartials(PartialsDir)


// Setup statci directoey to serve
app.use(express.static(PublicDir))

// app.get('', (req, res) => {
//     res.send('Hello express! Etemi is a Boy')
// })
app.get('', (req, res) => {
    res.render('index', {
        title : 'web design',
        name : 'Etemi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'The about page',
        name : 'Etemi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'This is the help page',
        name : 'Etemi'
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        message : 'Eroor 404, help article page not found '
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error : 'You must put in an address'
        })
    }

    goecode(req.query.address , ({longitude, latitude, label} = {}, error ) => {
        if (error) return res.send({error : error})
           forecast(latitude,longitude, (error, data) => {
                if (error) return res.send({error : error})
                res.send({
                    forecast: data,
                    address: req.query.address,
                    location: label
                })
                }
            )
        }
    )
    }
)
// app.get('/product', (req, res) => {
//     if (!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         product : []
//     })
// })

app.get('*', (req, res) => {
    res.render('error', {
        message : 'Error 404 page not found'
    })
})

app.listen(3000, () => {
    console.log('server port 300 is on')
})

