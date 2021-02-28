var data = require('../grat.json');
exports.view = function(req, res){
  res.render('gratitude', data)
};

exports.addGrat = function(req, res){
  var gratData = req.body;
  const num = req.body.num - 1;
  console.log(gratData);
  data.input.splice(num, 1, gratData);
  res.send(gratData);
};