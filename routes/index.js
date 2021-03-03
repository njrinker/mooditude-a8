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
//Updates JSON with selected theme value
exports.setTheme = function(req, res) {
	var themeData = req.body;
	data.themeChoice.splice(0, 1, themeData);
	res.send(themeData);
};
//Updates JSON with mood settings
exports.setMoods = function(req, res) {
	var moodData = req.body;
	const num = req.body.num - 1;
	data.bubbles.splice(num, 1, moodData);
	res.send(moodData);
};

exports.getForms = function(req, res) {
	res.json(data.form); 
};

exports.getTheme = function(req, res) {
	res.json(data.themeChoice); 
};

exports.getBubbles = function(req, res) {
	res.json(data.bubbles);
};