var bookList = [
	{
		_id: 0,
		title: 'Wool',
		author: 'Hugh Howey',
		genre: 'Science Fiction',
		read: false
	},
	{
		_id: 1,
		title: 'To Kill a Mockingbird',
		author: 'Harper Lee',
		genre: 'Fiction',
		read: false
	},
	{
		_id: 2,
		title: 'Dune',
		author: 'Frank Herbert',
		genre: 'Science Fiction',
		read: false
	},
	{
		_id: 3,
		title: 'The Fall of the Ottomans',
		author: 'Eugene Rogan',
		genre: 'History',
		read: false
	},
	{
		_id: 4,
		title: 'Empire Falls',
		author: 'Richard Russo',
		genre: 'Fiction',
		read: false
	},
	{
		_id: 5,
		title: 'Shift',
		author: 'Hugh Howey',
		genre: 'Science Fiction',
		read: false
	},
	{
		_id: 6,
		title: 'Truman',
		author: 'David McCullough',
		genre: 'History',
		read: false
	},
	{
		_id: 7,
		title: 'The Amazing Adventures of Kavalier and Klay',
		author: 'Michael Chabon',
		genre: 'Fiction',
		read: false
	},
	{
		_id: 8,
		title: 'Ulysses',
		author: 'James Joyce',
		genre: 'Fiction',
		read: false
	},
	{
		_id: 9,
		title: 'The Hobbit',
		author: 'J.R. Tolkien',
		genre: 'Fantasy',
		read: false
	}
];

var _ = require('underscore');

function getBooks (){
	return bookList;
}

function getBook(id){
	//we're passing in a string so convert to a number first
	id = parseInt(id,10); // 10 is a 'radix' or number base ie base10
	return _.find(bookList, function(book){
		return book._id === id; //if this is true, returns that book object
	});
}

function addBook(book){
	if(book){
		bookList.push(book);
	}
}

function removeBook(id){
	id = parseInt(id,10);
	//get the index value of the book id
	var index = _.findIndex(bookList, function(book){
		return book._id ===id;
	});
	bookList.splice(index,1); //remove 1 item and that item is at index 'index'
}

function updateBook(book){
	var id = book._id; //grab the id we passed in
	
	var prop;
	//find the index of the book
	var bookIndex = _.findIndex(bookList, function(tome){
		return tome._id === id;
	});
		
	//now remove the element and write the updated object into the bookList array
	bookList.splice(bookIndex, 1, book);
}



module.exports = {
	getBooks:getBooks,
	getBook:getBook,
	addBook:addBook,
	removeBook:removeBook,
	updateBook:updateBook
}