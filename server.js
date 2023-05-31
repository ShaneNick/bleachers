const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const env = require('dotenv').config();
const session = require('express-session');
const exphbs = require('express-handlebars');

// Import user routes
const userRoutes = require('./routes/userRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Setup handlebars  
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// Use user routes
app.use('./routes', userRoutes);

app.get('/', (req, res) => {
  res.render('partials/signup');
});

// Set up socket.io logic
require('./sockets/chat')(io);

app.use('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

http.listen(port, () => {
  console.log('Server is listening on', port);
});
