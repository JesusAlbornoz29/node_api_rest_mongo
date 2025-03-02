const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { config } = require('dotenv') // Importamos la funcion config de dotenv que sirve para cargar las variables de entorno
config()


// Aca pueden ser varias rutas si tengo ej: users, books, etc
// const usersRoutes = require('./routes/users.routes')
// const authRoutes = require('./routes/auth.routes')
// const profileRoutes = require('./routes/profile.routes'), etc...
const booksRoutes = require('./routes/books.routes')

const app = express() // esto hace que se cree una instancia de express

// bodyparser - Parseador de Bodies // Middleware
app.use(bodyParser.json()) 

// Nos conectamos a nuestra base de datos mongoos

mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME } ) 
const db = mongoose.connection;

app.use('/books', booksRoutes) // Aca se le dice que use la ruta de books si fuera profesores seria /profesores





const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    })