const path = require('path')
const express = require('express')
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000;

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handles bars engine views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath);

//to reflect changes in hbs, js nodemon src/app.js -e js,hbs

app.get('', (request, response)=>{
    response.render('index', { title : 'Weather app', name : 'Prerna Garg'}); //renders index.hbs from views folder hbs handlebar
});

app.get('/about', (request, response)=>{
    response.render('about', { title : "About", name : 'Prerna Garg'});
});

app.get('/help', (request, response)=>{
    response.render('help', { title : "Help",name: "Prerna Garg", body : " you can contact us @14102182prerna@gmail.com"});
});

app.get('/weather', (req, res) => {
    // res.render('index', { title : 'Weather app', name : 'Prerna Garg'}); //renders index.hbs from views folder hbs handlebar
    if(!req.query.address){
        res.send({
            error : "please provide the address"
        })
        return ;
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({error});
            return;
        }
        // res.send({
        //             forecast: forecastData,
        //             location: req.query.address
        //         })
        forecast({latitude, longitude}, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            // console.log(location)
            // console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: req.query.address
            })
        })
    })
    
})

app.get("/products", (request, response)=>{
    if(!request.query.search){
        response.send({error : "you must provide a search term"});
        return ;
    }
    console.log(request.query);
    response.send({products: request.query});
});

app.get('/help/*', (req, res)=>{
    res.render('404', {title : "Help",name: 'Prerna Garg', body : "help article not found"});
});


app.get('*', (req, res)=>{
    res.render('404', {title : "Error",name: 'Prerna Garg', body : "Errror 404 , page not found"});
});

app.listen(port, () => {
    console.log('Server is up on port ' +  3000)
})