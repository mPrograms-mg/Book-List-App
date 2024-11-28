const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  bookType: {
    type: String,
    enum: ["Fiction", "Non-Fiction", "Fantasy", "Science", "Biography", 'Technical'], // Restrict values
    default: "Fiction", // Default value
  },
},
  {
    timestamps: true, //Automatically add createdAt and updatedAt fields
  }
);

//Create Book Modal
const Books = mongoose.model("Book", bookSchema);
module.exports = Books;
