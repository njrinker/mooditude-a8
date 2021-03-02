//Parse JSON data
var grat = require('../grat.json');
//Renders webpage
exports.view = function(req, res){
  res.render('gratitude', grat)
};
//Updates JSON data with values from initGratForm in mood.js
exports.addGrat = function(req, res){
  var gratData = req.body;
  const num = req.body.num - 1;
  grat.input.splice(num, 1, gratData);
  res.send(gratData);
};