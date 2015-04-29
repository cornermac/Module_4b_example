$(function () {
	$.get('/books', function (bookList) { //push the list items into an array 
		var list = [];
		if (bookList) {
			bookList.forEach(function (book) {
				list.push('<li><li><span class="delete_link" data-book="' + book._id + '">X</span><a href="/books/' + book._id + '">' + book.title + '</a></li>');
			});
			$('.books-list').append(list);
		}
	});

	$('form').on('submit', function (evt) {
		evt.preventDefault();
		var $form = $(this);

		// serialize will transform our form data into urlencoded notation
		var bookData = $form.serialize();

		$.ajax({
			method: 'POST',
			url: '/books',
			data: bookData
		})
		.done(function (book) {
			var list = [];
			list.push('<li><span class="delete_link" data-book="' + book._id + '">X</span><a href="/books/' + book._id + '">' + book.title + '</a></li>');
			$('.books-list').append(list);
			$form.trigger('reset');
		});
	});

	$('.books-list').on('click', '[data-book]', function (evt) {
		if (!confirm('Delete book?')) {
			return false;
		}
		var $target = $(evt.currentTarget);

		$.ajax({
			method: 'DELETE',
			url: '/books/' + $target.data('book'),
		})
		.done(function () {
			$target.closest('li').remove();
		});
	});
});