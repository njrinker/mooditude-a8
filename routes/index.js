//Parse JSON data
var data = require('../mood.json');
//Renders webpage
exports.view = function(req, res) {
  res.render('index', data);
};
//Updates JSON data with values from initMoodForm in mood.js
exports.addMood = function(req, res) {
	var formData = req.body;
	const num = req.body.id;
	data.form.splice(num, 1, formData);
	res.send(formData);
};
//Updates JSON data with the id of a form
exports.idMood = function(req, res) {
	var idData = req.body;
	data.form.push(idData);
	res.send(idData);
}
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
//Updates JSON with colors based off of selected theme
exports.setColors = function(req, res) {
	var colorsData = req.body;
	data.theme.push(colorsData);
	res.send(colorsData);
}
//Updates JSON with graph details
exports.setGraph = function(req, res) {
	var graphData = req.body;
	const num = req.body.id - 1;
	data.report.splice(num, 1, graphData);
	res.send(graphData);
}
//Get JSON data for form
exports.getForms = function(req, res) {
	res.json(data.form); 
};
//Get JSON data for themeChoice
exports.getTheme = function(req, res) {
	res.json(data.themeChoice); 
};
//Get JSON data for bubbles
exports.getBubbles = function(req, res) {
	res.json(data.bubbles);
};
//Get all JSON data
exports.getAll = function(req, res) {
	res.json(data);
}