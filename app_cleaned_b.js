var express = require('express');
var app = express();
//use static so that / goes to public directory
app.use(express.static('public')); //same as var serveStatic = express.static('public); app.use(serveStatic);

var books = require('./books');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var idManager = require('./idManager');
idManager.setIds(books.getBooks()); //pass in the array of books

var bookRouter = require('./routes/bookRoutes');
var authorRouter = requre('./routes/authorRoutes');

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
 

app.listen(8000, function(){
	console.log('listening on port 8000');
});
