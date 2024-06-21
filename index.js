const express = require('express');
const app = express();
const port = process.env.PORT;

const { engine } = require('express-handlebars');

app.engine('hbs', engine({
    layoutsDir: `${__dirname}/views/layout`,
    defaultLayout: 'index',
    extname: 'hbs',
    partialsDir: `${__dirname}/views/partials`
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

// ======== Navigation =============== 
app.get('/', (req,res) => {
    res.render('main', {layout: 'index'});
});

app.get('/about', (req,res) => {
    res.render('main', {layout: 'about'});
});

app.get('/booking', (req,res) => {
    res.render('main', {layout: 'booking'});
});

app.get('/service', (req,res) => {
    res.render('main', {layout: 'service'});
});

app.get('/destination', (req,res) => {
    res.render('main', {layout: 'destination'});
});

app.get('/contact', (req,res) => {
    res.render('main', {layout: 'contact'});
});

app.get('/package', (req,res) => {
    res.render('main', {layout: 'package'});
});

app.get('/team', (req,res) => {
    res.render('main', {layout: 'team'});
});

app.get('/testimonial', (req,res) => {
    res.render('main', {layout: 'testimonial'});
});

app.get('/404', (req,res) => {
    res.render('main', {layout: '404'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});