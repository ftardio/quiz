// Construye la BD y el modelo importando quiz.js
// sequelize.sync() construye la BD según define el modelo

var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');
// Usr BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
        { dialect: "sqlite", storage: "quiz.sqlite" }
);
// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; // exportar definición de tabla Quiz

// Crea e inicializa la tabla de preguntas en la BD
sequelize.sync().then(function() {
  Quiz.count().then(function (count) {
    if (count === 0) { // la tabla se inicializa sólo si está vacía
      Quiz.create({ pregunta: 'Capital de Italia', respuesta: 'Roma' })
        .then( function () {console.log('Base de datos inicializada')});
    };
  });
});
