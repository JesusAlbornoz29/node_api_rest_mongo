const mongoose = require('mongoose');


// Forma de nuestro Objeto en la base de datos
const bookSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        genre: String,
        publication_date: String,
    }
)


// Se exporta de esta manera por que es un modelo de mongoose
module.exports =  mongoose.model('Book', bookSchema)