const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers');
const userRoutes = require('./controllers/api/userRoutes');  // Import the userRoutes

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For serving static assets (like CSS files)
app.use(express.static('public'));

// Setting up Handlebars.js as your view engine
const hbs = require('express-handlebars').create({ defaultLayout: 'main', extname: '.hbs' });
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Sessions
app.use(session({
  secret: 'secret',
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7200000 }  // 2 hours
}));

// Use the user routes
app.use('/api/users', userRoutes);  // Use the userRoutes

// Use the API routes
app.use(routes);

// Start the server after syncing the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
