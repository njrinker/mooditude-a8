var mood = require('../mood.json');
exports.view = function(req, res){
  res.render('index', mood);
};