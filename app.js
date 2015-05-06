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

app.get('/books',function(request,response){
	var bookList = books.getBooks();
	response.json(bookList);  //because bookList is in JSON format
});

app.get('/books/:id',function (request, response){
	var id = request.params.id; //get the id
	var book = books.getBook(id);
	if(book){
		response.json(book);
	}else{
		response.status(404).json('Book not found');
	}
});

app.post('/books',function(request,response){
	var newBook = request.body;
	if(newBook){
		newBook.read = false;
		newBook._id = idManager.getId(); //module to go get new id
		books.addBook(newBook);
		response.status(201).json(newBook);
	}else{
		response.status(400).json('problem adding the book');
	}
});

app.delete('/books/:id',function(request,response){
	var id = request.params.id; //get the id
	books.removeBook(id);
	response.sendStatus(200); //sends back ok in the body
});

app.put('/books/:id', function (request, response){
	var id = request.params.id;
	var bookUpdate = request.body;  //grabs the book object from the form using bodyparser
	bookUpdate._id = id;
	books.updateBook(bookUpdate);
	
});


app.listen(8000, function(){
	console.log('listening on port 8000');
});
