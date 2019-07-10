const express = require('express');
const app = express();
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const pug = require('pug');
const homepage = require('./routes/homepage')
const courses = require('./routes/courses')


const Joi = require ('joi');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', homepage);
app.use('/api/courses', courses);

app.set('view engine', 'pug');
app.set('views', './views');


console.log(`NODE_ENV is: ${process.env.NODE_ENV}`);
console.log(`App env: ${app.get('env')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan Enabled...');

}

dbDebugger('Connected to database...')

app.use(function(req, res, next) {
	console.log('Logging...');
	next();

});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
