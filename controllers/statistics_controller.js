var models = require('../models/models.js');

exports.index = function (req, res) {
  var stats = {};
  // Obtener el total de preguntas en la BD
  models.Quiz.count( {} )
  .then( function(count) {
    stats.totalPreguntas = count;
    // Obtener el total de comentarios de la BD
    models.Comment.count( { where: { publicado: true } } )
    .then( function(count) {
      stats.totalComentarios = count;
      // Obtener el total de preguntas con comentarios
      models.Quiz.findAll( {include:[{ model: models.Comment, required:true, where:{ publicado: true }}]} )
      .then( function(consulta) {
        stats.preguntasConCom = consulta.length;
        // Calcular el total de preguntas sin comentarios
        stats.preguntasSinCom = stats.totalPreguntas - stats.preguntasConCom;
        // Calcular la media de comentarios por pregunta
        stats.mediaComentarios = stats.totalComentarios / stats.totalPreguntas;
        res.render('statistics/index.ejs', {stats: stats, errors: []});
      });
    });
  });
};
