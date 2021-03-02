//Parse JSON data
var mood = require('../mood.json');
//Renders webpage
exports.view = function(req, res){
  res.render('report', mood);
};
//Updates JSON data with values from initGratForm in mood.js
exports.fillReport = function(req, res){
  var gratData = req.body;
  mood.input.push(gratData);
  res.send(gratData);
};