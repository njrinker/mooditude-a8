//Parse JSON data
var mood = require('../mood.json');
//Renders webpage
exports.view = function(req, res){
  res.render('report', mood);
};
//Updates JSON data with values from initGratForm in mood.js
exports.fillReport = function(req, res){
  var gratData = req.body;
  const num = req.body.num + 10;
  mood.input.splice(num, 1, gratData);
  res.send(gratData);
};