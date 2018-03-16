/*** This script is used to call the functions created ***/

// Event handler for when the page loads
window.addEventListener("DOMContentLoaded", () => {
  // Focus name input, hide "other" textfield, and hide t-shirt color selection
  onPageLoad();
});

// Event handler for "title" section
document.getElementById( "title" ).addEventListener("change", (event) => {
  /*
    Show "Other Job" text field when the "Other" option is selected,
    hide when user selects another option
  */
  const jobRole = event.target.value;
  const otherJob = document.getElementById("other-job");
  jobRole == "other" ? otherJob.style.display = "" : otherJob.style.display = "none";
});

// Event handler for color drop down menu
document.getElementById("design").addEventListener("change", (event) => {
  // Shows shirt designs according to option selected
  showColors(event.target.value)
});

// Event handler for activity registration div
document.querySelector(".activities").addEventListener("click", (event) => {
  /*
    When the user selects a workshop checkbox,
    if the activity is already selected,
    delete it from the selectedActivities array.
    Added to the array otherwise.
  */
  if (event.target.tagName === "INPUT") {
    if (selectedActivities.includes(event.target)) {
      selectedActivities.splice( selectedActivities.indexOf(event.target), 1 );
      changeLabelStatus(event.target, "enable");
    } else {
      selectedActivities.push(event.target);
      changeLabelStatus(event.target, "disable");
    }
    // Calculate and display a running total below checkboxes.
    currentPrice( event.target, activitiesFieldSet.querySelector("p") == null ? false : true);
  }
});

// Event handler for payment info fieldset
payment.addEventListener("change", (event) => {

  /*
    Display payment sections based on the payment option chosen
    in the select menu, and hide the others.
  */
  ccDiv.style.display = "none";
  paypalDiv.style.display = "none";
  bitcoinDiv.style.display = "none";

  if (event.target.value == "credit card") {
    ccDiv.style.display = "";
  } else if (event.target.value == "paypal") {
    paypalDiv.style.display = "";
  } else if (event.target.value == "bitcoin") {
    bitcoinDiv.style.display = "";
  }

});

// Event handler for submit button
submitButton.addEventListener("click", (event) => {

  /*
    Clears previous styling changes. If array returned from
    validateForm() is not empty, it prevents the form from submitting
    and displays the elements triggering the errors.
  */
  clearFormErrors();
  const invalidElements = validateForm();
  if ( invalidElements.length > 0 ) {
    event.preventDefault();
    validationMessages( invalidElements );
  }

});
