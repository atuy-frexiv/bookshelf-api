const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
} = require('./handler');
const books = require('./books');


const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
  {
    method: 'GET',
    path: '/{books?}',
    handler: (request) => {
      const { name, reading, finished } = request.query;

      const filteredBooks = books.filter((book) => {
        const isNameMatch = name ? book.name.toLowerCase().includes(name.toLowerCase()) : true;
        const isReadingMatch = reading !== undefined ? book.reading === (reading === '1') : true;
        const isFinishedMatch = finished !== undefined ? book.finished === (finished === '1') : true;
        return isNameMatch && isReadingMatch && isFinishedMatch;
      });

      return filteredBooks;
    },
  },
];

module.exports = routes;