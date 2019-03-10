// JS related to the main pages of the CBI project website

// Initialize the parallax
	document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
  });
// Initialize the dropdown
	document.addEventListener('DOMContentLoaded', function(){
		var elems = document.querySelectorAll('.dropdown-trigger');
		var instances = M.Dropdown.init(elems, {
			belowOrigin:true,
			coverTrigger: false,
			alignment: 'right',
			hover: true
		})
	});

// init collapsibles
document.addEventListener('DOMContentLoaded', function(){
	var elems = document.querySelectorAll('.collapsible');
	var instances = M.Collapsible.init(elems)
});

// init selects
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

// Fun toast from modeling tool page
function toast() {
	M.toast({html: 'Eventual link to Github'})
}


// email function wrapped up so it only loads on the data page
// Email is connected to the cbrecbiomass email address I set up. Forwards to mab61@humboldt.edu
function emailJS() {
// Function to send information from the form
document.getElementById('emailBtn').addEventListener('click', function(){
	// Check that there is a valid email address
	var email = document.getElementById('email').value;
	if (email == "") {
		M.toast({html: 'Please enter a valid email address'});
	} else {
		// gather information from form
	var from = document.getElementById('first').value + " " + document.getElementById('last').value;
	var org = document.getElementById('org').value; 
	var desc = document.getElementById('describe').value;
// Check all checkboxes 
	var checked = document.querySelectorAll('input[type=checkbox]');
	var checkedArray = [];
		for (var i = 0; i < checked.length; i++) {
			if (checked[i].checked == true) {
				checkedArray.push(checked[i].id)
			}
		}
	var message = document.getElementById('textarea1').value;
// Compose message
	fullMessage = "email: " + email +
					"<br> Organization: " + org + 
					"<br> Affiliation: " + desc +
					"<br>Data of interest: " + checkedArray + 
					"<br>" + message;
// Send email
	emailjs.send("cbrectool_gmail_com", "template_4KPMWmIu", 
		{"to_name":"SERC Staff",
		"from_name": from,
		"message_html": fullMessage})
// modal message of success
	if (email != "") {
		elem = document.getElementById('modal2');
		instance = M.Modal.init(elem);
		instance.open();
			}
	}
});
};

