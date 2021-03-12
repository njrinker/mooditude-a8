'use strict';
//Initialize index page
$(document).ready(function() {
	initializePage();
	initSelect();
	fillPage();
	initColors();
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
	addForm();
	colorSelector();
	$(document).on('change', 'select', colorSelector);
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
			var num = document.getElementsByClassName('moodDiv');
			for (i = 0; i < num.length; i++) {
  				var moodTime = $('#time' + i).val();
  				var moodText = document.getElementById('textarea' + i).value;
  				var moodOpt = document.getElementById('select' + i).selectedIndex;
  				var moodId = i;
  				if (moodText.length != 0) {
  					$.post('addMood', { id: moodId, time: moodTime, text: moodText, opt: moodOpt});
  					var add = document.getElementById('btn1')
    				if (add) {
    					add.removeAttribute('disabled');
    					add.classList.remove("disabled");
  					}
  				}
  				else {
  					alert("Please fill out any blank forms to save data and add another form");
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
  			$.post('fillReport', {text: gratText, num: gratNum});
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
		var colors = ["#EDEAA0", "#75DF79", "#AFA0ED", "#FF5757", "#14A3F6", "#ABA8A8", "#03989E", "#FF914D", "#EDA0A9", "#EDA0E1"];
		var height = ["85", "32", "44", "26", "28", "12", "8", "5", "10", "13"];
		for (i = 1; i <= 10; i++) {
			var moodSet = document.getElementById('moodcolor' + i).value;
			$.post('setMoods', { num: i, text: moodSet});
			$.post('setGraph', { id: i, mood: moodSet, color: colors[i - 1], height: height[i - 1]});
		}
		window.location.href="/index";
	});
}
//Checks the submission of the login (will be deprecated when login is replaced)
function checkForm() {
    var a = document.forms["login_form"]["username_in"].value;
    var b = document.forms["login_form"]["password_in"].value;
    if (a && b) {
    	window.location.href="/index";
    	return false;
    }
}
//Create a new form when the add button is pressed.	
function addForm() {
	$.post('getForms', contAddForm);

	function contAddForm(result) {
		var i;
		var num = 0;
		for (i = 0; i < result.length; i++) {
			if (result[i].hasOwnProperty('text')) {
				num++;
			}
		}
		var new_field = document.createElement("div");
		new_field.setAttribute("class", "container bkgr_color brdr_color moodDiv");
		new_field.setAttribute("id", "form" + num);

		var time = document.createElement("input");
		time.setAttribute("type", "time");
		time.setAttribute("class", "time bkgr_color");
		time.setAttribute("id", "time" + num);
		time.setAttribute("value", "00:00:00");

		var form = document.createElement("form");

		var text = document.createElement("textarea");
		text.setAttribute("class", "mood");
		text.setAttribute("id", "textarea" + num);
		text.setAttribute("cols", "100");
		text.setAttribute("rows", "1");
		text.setAttribute("required", "");

		var select = document.createElement("select");
		select.setAttribute("name", "grat_clr");
		select.setAttribute("class", "grat_clr fas bkgr_color mood_selector");
		select.setAttribute("id", "select" + num);
		select.setAttribute("required", "");

		addOption(select);
	
		form.append(time);
		form.append(text);
		form.append(select);
		new_field.append(form);

    	$("#forms").append(new_field);
    	var add = document.getElementById('btn1')
    	if (add) {
    		add.setAttribute('disabled', "");
    		add.setAttribute("class", "disabled button b_right fa-lg btn_color");
    	}
    	initColors();
    	setMoodForm(num);
	}
}
//Function to initialize the id of a form
function setMoodForm(index) {
	$.post('idMood', { id: index});
}
//Helper function to create selector options for the form.
function addOption(select) {
	var option_0 = document.createElement("option");
	option_0.setAttribute("value", "");
	option_0.setAttribute("selected", "");
	option_0.setAttribute("disabled", "");
	option_0.setAttribute("hidden", "");
	option_0.setAttribute("id", "b0");
	option_0.innerHTML = "Choose";
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
				storage[i].setAttribute("class", "b" + (i + 1) + "_color");
				storage[i].innerHTML = "&#xf111 " + result[i].text;
				select.append(storage[i]);
			}
		}
		initColors();
	}
}
/*Open side settings menu*/
function openSet() {
  document.getElementById("mySideSet").style.width = "500px";
  document.getElementById("btnset").style.marginLeft = "500px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
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
  		document.getElementById("form" + i).style.border = "0";
  		document.getElementById("textarea" + i).style.border = "0"
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
  $.post('getAll', contCloseSet);
  //Callback function to reset style on forms
  function contCloseSet(result) {
  	var i;
  	var index = result.themeChoice[0].num;
  			switch(index) {
			case "0":
				var nav_color = "#A4DAE8";
				var btn_color = "#A4DAE8";
				var bkgr_color = "#5FCAE1";
				var brdr_color = "#F9A9AF";
				break;
			case "1":
				var nav_color = "#E8B594";
				var btn_color = "#E8B594";
				var bkgr_color = "#A4DAEB";
				var brdr_color = "#EBBB9C";
				break;
			case "2":
				var nav_color = "#F9CCFF";
				var btn_color = "#F9CCFF";
				var bkgr_color = "#D5D6EA";
				var brdr_color = "#F5D5CB";
				break;
			case "3":
				var nav_color = "#FFF6A7";
				var btn_color = "#FFF6A7";
				var bkgr_color = "#A5F8CE";
				var brdr_color = "#FEC9A7";
				break;
			case "4":
				var nav_color = "#A2C4E0";
				var btn_color = "#A2C4E0";
				var bkgr_color = "#FFCC66";
				var brdr_color = "#336699";
				break;
			default:
				var nav_color = "#A4DAE8";
				var btn_color = "#A4DAE8";
				var bkgr_color = "#5FCAE1";
				var brdr_color = "#F9A9AF";
		}
	for (i = 0; i < result.form.length; i++) {
		document.getElementById("textarea" + i).style.backgroundColor = "white";
  		document.getElementById("form" + i).style.backgroundColor = bkgr_color;
  		document.getElementById("time" + i).style.backgroundColor = bkgr_color;
  		document.getElementById("btns").style.backgroundColor = btn_color;
  		document.getElementById("btnl").style.backgroundColor = btn_color;
  		document.getElementById("form" + i).style.border = "5px solid" + brdr_color;
	}
  }
}
//Function to set the page's theme based off of what theme has been selected in settings
function initColors() {
	$.post('getTheme', contInitColors);
	//Callback function to continue original task
	function contInitColors(result) {
		var index = result[0].num;
		switch(index) {
			case "0":
				var nav_color = "#A4DAE8";
				var btn_color = "#A4DAE8";
				var bkgr_color = "#5FCAE1";
				var brdr_color = "#F9A9AF";
				var b1 = "#EDEAA0";
				var b2 = "#75DF79";
				var b3 = "#AFA0ED";
				var b4 = "#FF5757";
				var b5 = "#14A3F6";
				var b6 = "#ABA8A8";
				var b7 = "#03989E";
				var b8 = "#FF914D";
				var b9 = "#EDA0A9";
				var b10 = "#EDA0E1";
				break;
			case "1":
				var nav_color = "#E8B594";
				var btn_color = "#E8B594";
				var bkgr_color = "#A4DAEB";
				var brdr_color = "#EBBB9C";
				var b1 = "#EDEAA0";
				var b2 = "#75DF79";
				var b3 = "#AFA0ED";
				var b4 = "#FF5757";
				var b5 = "#14A3F6";
				var b6 = "#ABA8A8";
				var b7 = "#03989E";
				var b8 = "#FF914D";
				var b9 = "#EDA0A9";
				var b10 = "#EDA0E1";
				break;
			case "2":
				var nav_color = "#F9CCFF";
				var btn_color = "#F9CCFF";
				var bkgr_color = "#D5D6EA";
				var brdr_color = "#F5D5CB";
				var b1 = "#EDEAA0";
				var b2 = "#75DF79";
				var b3 = "#AFA0ED";
				var b4 = "#FF5757";
				var b5 = "#14A3F6";
				var b6 = "#ABA8A8";
				var b7 = "#03989E";
				var b8 = "#FF914D";
				var b9 = "#EDA0A9";
				var b10 = "#EDA0E1";
				break;
			case "3":
				var nav_color = "#FFF6A7";
				var btn_color = "#FFF6A7";
				var bkgr_color = "#A5F8CE";
				var brdr_color = "#FEC9A7";
				var b1 = "#EDEAA0";
				var b2 = "#75DF79";
				var b3 = "#AFA0ED";
				var b4 = "#FF5757";
				var b5 = "#14A3F6";
				var b6 = "#ABA8A8";
				var b7 = "#03989E";
				var b8 = "#FF914D";
				var b9 = "#EDA0A9";
				var b10 = "#EDA0E1";
				break;
			case "4":
				var nav_color = "#A2C4E0";
				var btn_color = "#A2C4E0";
				var bkgr_color = "#FFCC66";
				var brdr_color = "#336699";
				var b1 = "#EDEAA0";
				var b2 = "#75DF79";
				var b3 = "#AFA0ED";
				var b4 = "#FF5757";
				var b5 = "#14A3F6";
				var b6 = "#ABA8A8";
				var b7 = "#03989E";
				var b8 = "#FF914D";
				var b9 = "#EDA0A9";
				var b10 = "#EDA0E1";
				break;
			default:
				var nav_color = "#A4DAE8";
				var btn_color = "#A4DAE8";
				var bkgr_color = "#5FCAE1";
				var brdr_color = "#F9A9AF";
				var b1 = "#EDEAA0";
				var b2 = "#75DF79";
				var b3 = "#AFA0ED";
				var b4 = "#FF5757";
				var b5 = "#14A3F6";
				var b6 = "#ABA8A8";
				var b7 = "#03989E";
				var b8 = "#FF914D";
				var b9 = "#EDA0A9";
				var b10 = "#EDA0E1";
		}
		$.post('setColors', { nav_color: nav_color, btn_color: btn_color, bkgr_color: bkgr_color, brdr_color: brdr_color, b1: b1, b2: b2, b3: b3, b4: b4, b5: b5, b6: b6, b7: b7, b8: b8, b9: b9, b10: b10}, finishInitColors);
		//Callback function to finish original task
		function finishInitColors(result) {
			var nav = document.getElementsByClassName('nav_color');
			var btn = document.getElementsByClassName('btn_color');
			var bkgr = document.getElementsByClassName('bkgr_color');
			var brdr = document.getElementsByClassName('brdr_color');
			var b1 = document.getElementsByClassName('b1_color');
			var b2 = document.getElementsByClassName('b2_color');
			var b3 = document.getElementsByClassName('b3_color');
			var b4 = document.getElementsByClassName('b4_color');
			var b5 = document.getElementsByClassName('b5_color');
			var b6 = document.getElementsByClassName('b6_color');
			var b7 = document.getElementsByClassName('b7_color');
			var b8 = document.getElementsByClassName('b8_color');
			var b9 = document.getElementsByClassName('b9_color');
			var b10 = document.getElementsByClassName('b10_color');
			var i;
			for (i = 0; i < nav.length; i++) {
				nav[i].style.color = result.nav_color;
			}
			for (i = 0; i < btn.length; i++) {
				btn[i].style.backgroundColor = result.btn_color;
			}
			for (i = 0; i < bkgr.length; i++) {
				bkgr[i].style.backgroundColor = result.bkgr_color;
			}
			for (i = 0; i < brdr.length; i++) {
				brdr[i].style.border = "5px solid " + result.brdr_color;
			}
			for (i = 0; i < b1.length; i++) {
				b1[i].style.color = result.b1;
			}
			for (i = 0; i < b2.length; i++) {
				b2[i].style.color = result.b2;
			}
			for (i = 0; i < b3.length; i++) {
				b3[i].style.color = result.b3;
			}
			for (i = 0; i < b4.length; i++) {
				b4[i].style.color = result.b4;
			}
			for (i = 0; i < b5.length; i++) {
				b5[i].style.color = result.b5;
			}
			for (i = 0; i < b6.length; i++) {
				b6[i].style.color = result.b6;
			}
			for (i = 0; i < b7.length; i++) {
				b7[i].style.color = result.b7;
			}
			for (i = 0; i < b8.length; i++) {
				b8[i].style.color = result.b8;
			}
			for (i = 0; i < b9.length; i++) {
				b9[i].style.color = result.b9;
			}
			for (i = 0; i < b10.length; i++) {
				b10[i].style.color = result.b10;
			}
		}
	}
}
//Function to handle coloring the selector when a mood is selected
function colorSelector() {
	$.post('getAll', contColorSelector);
	//Callback function to continue original function
	function contColorSelector(result) {
		var i;
		var index = result.themeChoice[0].num;
		var mood_selector = document.getElementsByClassName('mood_selector');
		for (i = 0; i < mood_selector.length; i++) {
			if (result.form[i].opt) {
				var curr = result.form[i].opt - 1;
				switch(curr) {
					case 0:
						mood_selector[i].style.color = "#EDEAA0";
						break;
					case 1:
						mood_selector[i].style.color = "#75DF79";
						break;
					case 2:
						mood_selector[i].style.color = "#AFA0ED";
						break;
					case 3:
						mood_selector[i].style.color = "#FF5757";
						break;
					case 4:
						mood_selector[i].style.color = "#14A3F6";
						break;
					case 5:
						mood_selector[i].style.color = "#ABA8A8";
						break;
					case 6:
						mood_selector[i].style.color = "#03989E";
						break;
					case 7:
						mood_selector[i].style.color = "#FF914D";
						break;
					case 8:
						mood_selector[i].style.color = "#EDA0A9";
						break;
					case 9:
						mood_selector[i].style.color = "#EDA0E1";
						break;
					default:
						mood_selector[i].style.color = "black";
				}
			}
			else {
				var curr = mood_selector[i].selectedIndex - 1;
				switch(curr) {
					case 0:
						mood_selector[i].style.color = "#EDEAA0";
						break;
					case 1:
						mood_selector[i].style.color = "#75DF79";
						break;
					case 2:
						mood_selector[i].style.color = "#AFA0ED";
						break;
					case 3:
						mood_selector[i].style.color = "#FF5757";
						break;
					case 4:
						mood_selector[i].style.color = "#14A3F6";
						break;
					case 5:
						mood_selector[i].style.color = "#ABA8A8";
						break;
					case 6:
						mood_selector[i].style.color = "#03989E";
						break;
					case 7:
						mood_selector[i].style.color = "#FF914D";
						break;
					case 8:
						mood_selector[i].style.color = "#EDA0A9";
						break;
					case 9:
						mood_selector[i].style.color = "#EDA0E1";
						break;
					default:
						mood_selector[i].style.color = "black";
				}
			}			
		}
	}
}