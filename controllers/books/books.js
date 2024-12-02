const Book = require("../../models/book");

// check book Valida type
const validBookTypes = ["Fiction", "Non-Fiction", "Fantasy", "Science", "Biography", 'Technical'];

// GET route to get All a books
const getBook = async (req, res) => {
    try {
        // Fetch all books
        const bookData = await Book.find();
        // Count total books
        const totalBooks = await Book.countDocuments();
        res.status(200).json({
            books: bookData,  // Array of books
            total: totalBooks, // Total count
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while saving the book.",
            error: error.message, // Include the error message fo
        });
    }
}

const getBookByType = async (req, res) => {
    try {
        const bookType = req.params.type;
        if (bookType && validBookTypes.includes(bookType)) {
            const response = await Book.find({ bookType: bookType })
            // Count total books
            const totalTypeBooks = await Book.find({ bookType: bookType }).countDocuments();
            res.status(200).json({
                books: response,  // Array of books
                total: totalTypeBooks, // Total count
            });
        }
        else {
            res.status(404).json({ error: 'Invalid book type' })
        }
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while saving the book.",
            error: error.message, // Include the error message fo
        });
    }
}

const addBook = async (req, res) => {
    try {
        const data = req.body;

        // Create a new Person document using the mongoose Modal
        const newBook = new Book(data);

        // Save the Books to the Database
        const response = await newBook.save();
        res.status(200).json({
            message: 'Book Addedd Successfully',
            response: response
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while saving the book.",
            error: error.message, // Include the error message fo
        });
    }
}

const updateBook = async (req, res) => {
    try {
        const bookID = req.params.id // Extract id from URl
        const updateBook = req.body; // Update Book details from person

        const response = await Book.findByIdAndUpdate(bookID, updateBook, {
            new: true, // Return the updated document
            runValidators: true // Run mongoose validations
        })

        if (!response) {
            return res.status(404).json({ error: 'Book Not Found' })
        }
        res.status(200).json({
            message: 'Book Updates Successfully',
            response: response
        });
    }
    catch (error) {

        res.status(500).json({
            message: "An error occurred while saving the book.",
            error: error.message, // Include the error message fo
        });
    }
}

const deleteBook = async (req, res) => {
    try {
        const bookID = req.params.id // Extract id from URl

        // Delete the book by ID
        const deleteBook = await Book.findByIdAndDelete(bookID)

        if (!deleteBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            message: "Book deleted successfully",
            deleteBook,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while saving the book.",
            error: error.message, // Include the error message fo
        });
    }
}

module.exports = { getBook, getBookByType, addBook, updateBook, deleteBook }


