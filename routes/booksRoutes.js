const express = require("express")
const booksRoutes = express.Router()
const { getBook, getBookByType, addBook, updateBook, deleteBook } = require('../controllers/books/books')

booksRoutes.get('/', getBook)
booksRoutes.get('/:type', getBookByType)
booksRoutes.post('/', addBook)
booksRoutes.put('/:id', updateBook)
booksRoutes.delete('/:id', deleteBook)

module.exports = booksRoutes
