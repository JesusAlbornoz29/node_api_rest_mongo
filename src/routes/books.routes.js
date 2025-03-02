const express = require('express'); // este es el modulo que se encarga de manejar las rutas
const router = express.Router();
const Book = require('../models/books.model');



// MIDDLEWARE 
/*
Un middleware en Express (y en general en desarrollo backend)
es una función que se ejecuta en la mitad del ciclo de una petición HTTP
antes de que llegue al controlador final. Los middlewares pueden modificar la solicitud (req),
la respuesta (res) o incluso terminar la petición sin pasarla a la siguiente función.
*/

const getBook = async (req, res, next) => {
    let book;
    const { id } = req.params; 

    if (!id.match(/^[0-9a-fA-F]{24}$/)) { // Esto lo que dice es que si no matchea con el tipico ID de MongoDB, entonces que devuelva un error
        return res.status(404).json(
            { 
                message: 'Invalid ID' 
            }
        )
    }

    try {
        book = await Book.findById(id);
        if (!book){
            return res.status(404).json(
                {
                     message: 'Book not found' 
                    }
                )
        }
    } catch (error) {
        return res.status(500).json(
            {
                 message: error.message 
                }
            )
    }

    res.book = book; // Configura la respuesta en book
    next(); // y continua con la ejecución
}


// Obtener todos los libros GET ALL
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        console.log('GET ALL', books)
        if(books.length === 0) {
            return res.status(204).json([])
        }
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Crear un libro POST
router.post('/', async (req, res) => {
    const { title, author, genre, publication_date } = req?.body
    if(!title || !author || !genre || !publication_date) {
        return res.status(400).json({ 
            message: 'All fields are required' 
        })         
    }

    const book = new Book(
        {
        title,
        author,
        genre,
        publication_date
        }
    )

    try {
        const newBook = await book.save()
        console.log(newBook)
        res.status(201).json(newBook)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


// Get idndividual book GET ONE
router.get('/:id', getBook, async(req, res) => {
    res.json(res.book);
})


// PUT - Actualizar un libro
router.put('/:id', getBook, async(req, res) => {
    try {
        const book = res.book
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;

        const updatedBook = await book.save()
        res.json(updatedBook)
    } catch (error) {
        res.status(400).json({ 
            message: error.message
         })
    }
})


// PATCH - Actualizar un libro
router.patch('/:id', getBook, async(req, res) => {

    if (!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date) {
        return res.status(400).json({ 
            message: 'At least one field is required' 
        })         
    }

    try {
        const book = res.book
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;

        const updatedBook = await book.save()
        res.json(updatedBook)
    } catch (error) {
        res.status(400).json({ 
            message: error.message
         })
    }
})


// DELETE - Borrar un libro

router.delete('/:id', getBook, async(req, res) => {
    try {
        await res.book.deleteOne({
            _id: res.book.id
        })
        res.json({ 
            message: `Book deleted` 
        })
    } catch (error) {
        res.status(500).json({ 
            message: error.message
         })
    }
})

module.exports = router; // Exporta el router para que pueda ser utilizado en otros archivos
