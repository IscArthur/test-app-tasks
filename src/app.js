const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
//Conexión a BD
mongoose
    .connect('mongodb://localhost/crud-mongo', {useNewUrlParser:true})
    .then(db => console.log('Conectado a la BD'))
    .catch(err => console.log(err));
//Importación de Rutas
const indexRoutes = require('./routes/index');
//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
//Rutas
app.use('/', indexRoutes);
//Inicio de servicios Servidor Local
app.listen(app.get('port'), () => {
    console.log(`Servidor local en puerto: ${app.get('port')}`);
});
