const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Import event data
const events = require('./data');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());
  res.render('index', { upcomingEvents, pastEvents });
});

app.get('/add-event', (req, res) => {
  res.render('addEvent');
});

app.post('/add-event', (req, res) => {
  const newEvent = {
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
    description: req.body.description,
    poster: req.body.poster
  };
  events.push(newEvent);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
