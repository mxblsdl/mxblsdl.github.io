// *************  Initialize Materialize Elements * Adds reactive 

// Functions relating to reacitce UI for forestry tool

// Initialize the select elements
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });
// Initialize the modal
 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
 // Initialize Collapsible
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  });

  // Add event listeners to the radio buttons
// I like this method more than using in HTML on click events

  /************** Reactive User Inputs ******************/ 
// Cause the percent basal area dropdown to appear 
function basalAreaSelect(){
  e = document.getElementById("treatment");
  optionValue = e.options[e.selectedIndex].value;

if (optionValue == "TFA") {
  document.getElementById("helperModal").href = '#modal1';
} else if (optionValue == "TFB") {
  document.getElementById("helperModal").href = '#modal2';
} else if (optionValue == "TP") {
  document.getElementById("helperModal").href = '#modal3';
} else if (optionValue == "RM100") {
  document.getElementById("helperModal").href = '#modal4';
}

  var treat = document.getElementById("treatment");
  var selectedTreatment = treatment.options[treatment.selectedIndex].value;
  // Set an if statement so first item can't be selected.
if (selectedTreatment == "TFA" || selectedTreatment == "TFB" || selectedTreatment == "TP") {
  document.getElementById("basal-area").style.visibility = "visible";
  document.getElementById("basal-area").style.opacity = "1";
    }
else{
  document.getElementById("basal-area").style.visibility="hidden";
  document.getElementById("basal-area").style.opacity="0";
    }
  }

  // **************** Modal pop up ****************//

// Show pop up box with information in it.
function displayMore(){
  // Only display if something is selected
  var treatment = document.getElementById("treatment");
  var selectedTreatment = treatment.value;
  if (selectedTreatment != "Treatment Type"){
  // Make visible
  // document.getElementById('basal-area-info').style.opacity=1;
  if (selectedTreatment == "RM100"){
    document.getElementById("treat-info").innerHTML="This harvest removes the maximum amount of wood volume while conforming to California forest practice rules and regulations.";
    }
  if (selectedTreatment == "TFB"){
    document.getElementById("treat-info").innerHTML = "Thin from below removes trees starting with the smallest basal areas. This would be for forest health thinnings or fuel reduction treatments. ";
    }
  if (selectedTreatment == "TFA"){
    document.getElementById("treat-info").innerHTML = "Thin from above removes the largest trees first, opening up the canopy for the understroy.";
    }
  if (selectedTreatment == "TP"){
    document.getElementById("treat-info").innerHTML = "A proportional thin removes an even amount of small and large trees regardless of basal area.";
    }
  }
}