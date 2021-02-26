'use strict';
//Initialize index page
$(document).ready(function() {
	initializePage();
})
//Page initialization
function initializePage() {
	/*$("#btns").click(save);*/
	$("#btn1").click(addForm);
	$("#sub_btn").click(checkForm);
}

/*function save() {
	console.log(5);
	mood.form.text.push(document.getElementById("1").value);
}*/
function checkForm() {
    var a = document.forms["login_form"]["username_in"].value;
    var b = document.forms["login_form"]["password_in"].value;
    if (a && b) {
    	window.location.href="/";
    	return false;
    }
}
//Create a new form when the add button is pressed.	Needs JSON integration.
function addForm() {
	var new_field = document.createElement("div");
	new_field.setAttribute("class", "container");

	var time = document.createElement("input");
	time.setAttribute("type", "time");
	time.setAttribute("class", "time");

	var form = document.createElement("form");

	var text = document.createElement("textarea");
	text.setAttribute("class", "mood");
	text.setAttribute("cols", "100");
	text.setAttribute("rows", "7");
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

    $(".entry").append(new_field);
}
//Helper function to create selector options for the form. Needs to be implemented with a loop and needs to have JSON integration.
function addOption(select){
	var option_0 = document.createElement("option");
	option_0.setAttribute("value", "");
	option_0.setAttribute("selected", "");
	option_0.setAttribute("disabled", "");
	option_0.setAttribute("hidden", "");
	option_0.innerHTML = "Choose here";

	var option_1 = document.createElement("option");
	option_1.setAttribute("value", "fas fa-circle");
	option_1.setAttribute("id", "i1");
	option_1.innerHTML = "&#xf111 Sad";

	var option_2 = document.createElement("option");
	option_2.setAttribute("value", "fas fa-circle");
	option_2.setAttribute("id", "i2");
	option_2.innerHTML = "&#xf111 Angry";

	var option_3 = document.createElement("option");
	option_3.setAttribute("value", "fas fa-circle");
	option_3.setAttribute("id", "i3");
	option_3.innerHTML = "&#xf111 Energetic";

	var option_4 = document.createElement("option");
	option_4.setAttribute("value", "fas fa-circle");
	option_4.setAttribute("id", "i4");
	option_4.innerHTML = "&#xf111 Happy";

	var option_5 = document.createElement("option");
	option_5.setAttribute("value", "fas fa-circle");
	option_5.setAttribute("id", "i5");
	option_5.innerHTML = "&#xf111 Motivated";

	var option_6 = document.createElement("option");
	option_6.setAttribute("value", "fas fa-circle");
	option_6.setAttribute("id", "i6");
	option_6.innerHTML = "&#xf111 Depressed";

	select.append(option_0);
	select.append(option_1);
	select.append(option_2);
	select.append(option_3);
	select.append(option_4);
	select.append(option_5);
	select.append(option_6);
}