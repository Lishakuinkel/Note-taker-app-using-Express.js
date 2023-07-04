// Importing dependencies 
const express = require('express');//imports express module
const path = require('path'); //utility module that provides a way of working with directories and file paths
const fs = require('fs'); //import fs module
const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');

// Setting up Server
const app = express(); //creates an express application
const PORT = process.env.PORT || 3001; //dynamically setting the port

//handling data parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); // Static middleware

app.use(htmlRoutes);
app.use(apiRoutes);

  
app.listen(PORT, () => {console.log('Server running on http://localhost:${PORT}')});




