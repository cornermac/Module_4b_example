var express = require('express');

// now create an object called router
var router = express.Router();

router.route('/')
	.get(function(request,response){
		var bookList = books.getBooks();
		response.json(bookList);  //because bookList is in JSON format
	});
	.post('/',function(request,response){
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
	
router.route('/:id')
	.get('/:id',function (request, response){
		var id = request.params.id; //get the id
		var book = books.getBook(id);
		if(book){
			response.json(book);
		}else{
			response.status(404).json('Book not found');
		}
	});
	.delete('/:id',function(request,response){
		var id = request.params.id; //get the id
		books.removeBook(id);
		response.sendStatus(200); //sends back ok in the body
	});
	.put('/:id', function (request, response){
		var id = request.params.id;
		var bookUpdate = request.body;  //grabs the book object from the form using bodyparser
		bookUpdate._id = id;
		books.updateBook(bookUpdate);
	});





module.exports = router;