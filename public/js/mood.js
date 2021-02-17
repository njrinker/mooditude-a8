'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	addForm();
	$("#btn1").click(addForm);
}

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
	
/*
"<div class="container"><form><textarea class="mood" cols="100" rows="5" required></textarea><select name="grat_clr" class="grat_clr" class="fas" required><option value="" selected disabled hidden>Choose here</option><option value="fas fa-circle" class="i1">&#xf111 Sad</option><option value="fas fa-circle" class="i2">&#xf111 Angry</option><option value="fas fa-circle" class="i3">&#xf111 Energetic</option><option value="fas fa-circle" class="i4">&#xf111 Happy</option><option value="fas fa-circle" class="i5">&#xf111 Motivated</option><option value="fas fa-circle" class="i6">&#xf111 Depressed</option></select></form></div>";

var down = document.getElementById("GFG_DOWN"); 
            function GFG_Fun() { 
                
                // Create a form synamically 
                var form = document.createElement("form"); 
                form.setAttribute("method", "post"); 
                form.setAttribute("action", "submit.php"); 
  
                // Create an input element for emailID 
                var ID = document.createElement("input"); 
                ID.setAttribute("type", "text"); 
                ID.setAttribute("name", "emailID"); 
                ID.setAttribute("placeholder", "E-Mail ID"); 
  
                // Create an input element for password 
                var PWD = document.createElement("input"); 
                PWD.setAttribute("type", "password"); 
                PWD.setAttribute("name", "password"); 
                PWD.setAttribute("placeholder", "Password"); 
  
                // Create a submit button 
                var s = document.createElement("input"); 
                s.setAttribute("type", "submit"); 
                s.setAttribute("value", "Submit"); 
  
                // Append the email_ID input to the form 
                form.append(ID);  
                
                // Append the password to the form 
                form.append(PWD);  
                
                // Append the button to the form 
                form.append(s);  
  
                document.getElementsByTagName("body")[0] 
               .appendChild(form); 
            } */