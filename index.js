const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { engine } = require('express-handlebars');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const db = require('./config/db.js'); // Import database connection pool
const app = express();

// Session configuration
const sessionStore = new mysqlStore({
    expiration: 86400000, // Session expiration time (optional)
    endConnectionOnClose: true, // Automatically close expired sessions (optional)
    createDatabaseTable: true, // Automatically create sessions table (optional)
    schema: {
      tableName: 'sessions', // Customize sessions table name (optional)
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
      }
    }
  }, db); // Use the database connection pool
  
  app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret', // Secret key for session hashing
    resave: false,
    saveUninitialized: true,
    store: sessionStore, // Use MySQL session store
    cookie: {
      maxAge: 86400000 // Cookie expiration time (optional)
    }
  }));

// const fullstackDB = require('./config/DBConnection');
// fullstackDB.setUpDB(true);

// Setup Handlebars engine
app.engine('hbs', engine({
    layoutsDir: `${__dirname}/views/layout`,
    defaultLayout: 'index',
    extname: 'hbs',
    partialsDir: `${__dirname}/views/partials`
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

// Test MySQL connection
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users;");
        console.log(rows);
        res.send(rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Database query error');
    }
});

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