'use strict';
//Initialize index page
$(document).ready(function() {
	initializePage();
	initSelect();
	fillPage();
})
//Page initialization
function initializePage() {
	$("#btn1").click(addForm);
	$("#sub_btn").click(checkForm);
	$("#btnset").click(openSet);
	$("#btncls").click(closeSet);
	initMoodForm();
	initGratForm();
	initSetForm();
}
//Function to initialize page with proper data
function fillPage() {
	$.post('getForms', setFormSelected);
	$.post('getTheme', initTheme);

	//Callback function that sets the selected mood on each form
	function setFormSelected(result) {
		var i;
		for (i = 0; i < result.length; i++) {
			var optSelect = result[i].opt;
			if (document.getElementById('select' + i)) {
				document.getElementById('select' + i).selectedIndex = optSelect;
			}
		}
	}
	//Callback function that sets the theme on the website
	function initTheme(result) {
		var themeSelect = result[0].num;
		if (document.getElementById('themeselector')) {
			document.getElementById('themeselector').selectedIndex = themeSelect;
		}
	}
}
//Function to save user input from mood page
function initMoodForm() {
	$('#moodForm').submit(function(e) {
		e.preventDefault();
		$.post('getForms', contMoodForm);
		//Callback function to finish the original process
		function contMoodForm(result) {
			console.log("Submitting moodForm...");
			var i;
			for (i = 0; i < result.length; i++) {
  				var moodTime = $('#time' + i).val();
  				var moodText = document.getElementById('textarea' + i).value;
  				var moodOpt = document.getElementById('select' + i).selectedIndex;
  				var moodId = i + 1;
  				if (moodText.length != 0) {
  					$.post('addMood', { id: moodId, time: moodTime, text: moodText, opt: moodOpt});
  				}
  		}
  	}
  });
}
//Function to take care of the pesky selectors in the mood forms
function initSelect() {
	var i;
	var selectors = document.querySelectorAll("select");
  	for (i = 1; i < selectors.length; i++) {
  		addOption(selectors[i]);
  	}
}
//Function to save user input from gratitude page and sends it to be displayed on report page
function initGratForm() {
  $('#gratForm').submit(function(e) {
  	e.preventDefault();
  	console.log("Submitting gratForm...");
  	var i;
  	for (i = 1; i <= 10; i++) {
  		var gratText = $('#grat' + i).val();
  		var gratNum = document.getElementById('grat_lbl' + i).innerHTML;
  		$.post('addGrat', { text: gratText, num: gratNum});
  		if (gratText.length != 0) {
  			$.post('fillReport', {text: gratText});
  		}
  	}
  });
}
//Function to save user's choice of settings
function initSetForm() {
	$('#settings').submit(function(e) {
		e.preventDefault();
		console.log("Submitting settings...");
		var themeChoice = document.getElementById('themeselector').selectedIndex;
		$.post('setTheme', { num: themeChoice});
		var i;
		var colors = ["yellow", "green", "purple", "red", "blue", "grey", "cyan", "orange", "maroon", "violet"];
		for (i = 1; i <= 10; i++) {
			var moodSet = document.getElementById('moodcolor' + i).value;
			$.post('setMoods', { num: i, color: colors[i-1], text: moodSet});
		}
		window.location.href="/";
	});
}
//Checks the submission of the login (will be deprecated when login is replaced)
function checkForm() {
    var a = document.forms["login_form"]["username_in"].value;
    var b = document.forms["login_form"]["password_in"].value;
    if (a && b) {
    	window.location.href="/";
    	return false;
    }
}

//Create a new form when the add button is pressed.	
function addForm() {
	var new_field = document.createElement("div");
	new_field.setAttribute("class", "container");

	var time = document.createElement("input");
	time.setAttribute("type", "time");
	time.setAttribute("class", "time");
	time.setAttribute("value", "00:00:00");

	var form = document.createElement("form");

	var text = document.createElement("textarea");
	text.setAttribute("class", "mood");
	text.setAttribute("cols", "100");
	text.setAttribute("rows", "1");
	text.setAttribute("required", "");

	var select = document.createElement("select");
	select.setAttribute("name", "grat_clr");
	select.setAttribute("class", "grat_clr fas");
	select.setAttribute("required", "");

	addOption(select);
	
	form.append(time);
	form.append(text);
	form.append(select);
	new_field.append(form);

    $(".entry").prepend(new_field);
}
//Helper function to create selector options for the form.
function addOption(select) {
	var option_0 = document.createElement("option");
	option_0.setAttribute("value", "");
	option_0.setAttribute("selected", "");
	option_0.setAttribute("disabled", "");
	option_0.setAttribute("hidden", "");
	option_0.setAttribute("clrid", "i0");
	option_0.innerHTML = "&#xf111 Choose";
	select.append(option_0);
	$.post('getBubbles', contAddOption);
	//Callback function to finish process
	function contAddOption(result) {
		var i;
		var storage = [];
		for (i = 0; i < result.length; i++) {
			if (result[i].text.length != 0) {
				storage[i] = document.createElement("option");
				storage[i].setAttribute("value", "fas fa-circle");
				storage[i].setAttribute("clrid", "i" + i);
				storage[i].innerHTML = "&#xf111 " + result[i].text;
				select.append(storage[i]);
			}
		}
	}
	/*var option_1 = document.createElement("option");
	option_1.setAttribute("value", "fas fa-circle");
	option_1.setAttribute("clrid", "i1");
	option_1.innerHTML = "&#xf111 Sad";

	var option_2 = document.createElement("option");
	option_2.setAttribute("value", "fas fa-circle");
	option_2.setAttribute("clrid", "i2");
	option_2.innerHTML = "&#xf111 Angry";

	var option_3 = document.createElement("option");
	option_3.setAttribute("value", "fas fa-circle");
	option_3.setAttribute("clrid", "i3");
	option_3.innerHTML = "&#xf111 Energetic";

	var option_4 = document.createElement("option");
	option_4.setAttribute("value", "fas fa-circle");
	option_4.setAttribute("clrid", "i4");
	option_4.innerHTML = "&#xf111 Happy";

	var option_5 = document.createElement("option");
	option_5.setAttribute("value", "fas fa-circle");
	option_5.setAttribute("clrid", "i5");
	option_5.innerHTML = "&#xf111 Motivated";

	var option_6 = document.createElement("option");
	option_6.setAttribute("value", "fas fa-circle");
	option_6.setAttribute("clrid", "i6");
	option_6.innerHTML = "&#xf111 Depressed";

	select.append(option_0);
	select.append(option_1);
	select.append(option_2);
	select.append(option_3);
	select.append(option_4);
	select.append(option_5);
	select.append(option_6);*/
}
/*Open side settings menu*/
function openSet() {
  document.getElementById("mySideSet").style.width = "500px";
  document.getElementById("btnset").style.marginLeft = "500px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  document.getElementById("btnh").style.backgroundColor = "rgba(0,0,0,0)";
  document.getElementById("btns").style.backgroundColor = "rgba(0,0,0,0)";
  document.getElementById("btnl").style.backgroundColor = "rgba(0,0,0,0)";
  $.post('getForms', contOpenSet);
  //Callback function to set style on forms
  function contOpenSet(result) {
  	var i;
	for (i = 0; i < result.length; i++) {
		document.getElementById("textarea" + i).style.backgroundColor = "rgba(0,0,0,0)";
  		document.getElementById("form" + i).style.backgroundColor = "rgba(0,0,0,0)";
  		document.getElementById("time" + i).style.backgroundColor = "rgba(0,0,0,0)";
  		document.getElementById("textarea" + i).style.border = "0"
  		document.getElementById("time" + i).style.border = "0";
	}
  }
}
/*Close side settings menu*/
function closeSet() {
  document.getElementById("mySideSet").style.width = "0";
  document.getElementById("btnset").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
  document.getElementById("btns").style.backgroundColor = "#aaa";
  document.getElementById("btnl").style.backgroundColor = "#aaa";
  $.post('getForms', contCloseSet);
  //Callback function to reset style on forms
  function contCloseSet(result) {
  	var i;
	for (i = 0; i < result.length; i++) {
		document.getElementById("textarea" + i).style.backgroundColor = "white";
  		document.getElementById("form" + i).style.backgroundColor = "#f7f7f7";
  		document.getElementById("time" + i).style.backgroundColor = "#f7f7f7";
	}
  }
}