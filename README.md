# API REST con Express y MongoDB

Este proyecto es un servidor **API REST** desarrollado con **Node.js**, **Express** y **MongoDB** para gestionar libros.

## 🚀 Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB (con Mongoose)
- Docker (opcional)

## 📦 Instalación y Configuración

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/JesusAlbornoz29/node_api_rest_mongo.git
cd node_api_rest_mongo
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno
Crear un archivo **.env** en la raíz del proyecto con el siguiente contenido:
```env
MONGO_URI=mongodb://localhost:27017/booksdb
PORT=3000
```

### 4️⃣ Ejecutar el Servidor
```bash
npm start
```
El servidor se ejecutará en `http://localhost:3000`

## 🐳 Uso con Docker (Opcional)
Si quieres correr la API y la base de datos en contenedores Docker:

### 1️⃣ Levantar los servicios
```bash
docker-compose up -d
```
Esto iniciará **MongoDB** y la API en contenedores.

### 2️⃣ Verificar contenedores activos
```bash
docker ps
```

## 📚 Endpoints
### 🔍 Obtener todos los libros
```http
GET /api/books
```
### 📖 Obtener un libro por ID
```http
GET /api/books/:id
```
### ➕ Agregar un libro
```http
POST /api/books
```
**Body:**
```json
{
  "title": "El Principito",
  "author": "Antoine de Saint-Exupéry",
  "genre": "Ficción",
  "public_date": "1943-04-06"
}
```
### ✏️ Actualizar un libro
```http
PUT /api/books/:id
```
### ❌ Eliminar un libro
```http
DELETE /api/books/:id
```

## 🚀 Contribuciones
Si deseas contribuir, siéntete libre de hacer un **fork** y enviar un **pull request**. 🙌

## 📄 Licencia
Este proyecto está bajo la licencia **MIT**.

