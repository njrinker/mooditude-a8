//Parse JSON data
var data = require('../mood.json');
//Renders webpage
exports.view = function(req, res) {
  res.render('index', data);
};

//Updates JSON data with values from initMoodForm in mood.js
exports.addMood = function(req, res) {
	var formData = req.body;
	//Append to the beginging of data
	data.form.unshift(formData);
	res.send(formData);
};