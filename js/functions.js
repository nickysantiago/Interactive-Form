/*
  This script is used to declare all the functions
*/

const onPageLoad = () => {

    /*
      Give focus to the first text field,
       Hide "Other" text field from page,
       Hide t-shirt color selection,
       Hide CC, PayPal, and Bitcoin info
    */
    document.getElementById("name").focus();
    document.getElementById("other-job").style.display = "none";
    document.getElementById("colors-js-puns").style.display = "none";
    ccDiv.style.display = "none";
    paypalDiv.style.display = "none";
    bitcoinDiv.style.display = "none";

};

const showColors = (design) => {

  /*
    For the T-Shirt color menu, only display the color options that match the design
    selected in the "Design" menu. If no design has been selected, then hide the color
    menu. Once a design has been selected, make first color option the default option.
  */
  if (design == "Select Theme") {
    colorDiv.style.display = "none";
  } else {
    colorDiv.style.display = "";
    for (let i=0; i < colorOptions.length; i++) {
      let designsIndex = i < 3 ? 0 : 1;
      colorOptions[i].style.display = design == designs[designsIndex] ? "" : "none";
    }
    if (designSelect.value == designs[0]) {
      colorOptions[0].setAttribute("selected", "");
      colorOptions[3].removeAttribute("selected");
    } else if (designSelect.value == designs[1]) {
      colorOptions[3].setAttribute("selected", "");
      colorOptions[0].removeAttribute("selected");
    }
  }

};

const changeLabelStatus = (target, status) => {

  /*
    If the user selects a workshop, don't allow selection of a workshop at
    the same time and date.
  */
  if (target.parentNode.querySelector(".activity-day") !== null) {
    const day = target.parentNode.querySelector(".activity-day").textContent;
    const startTime = target.parentNode.querySelector(".activity-start-time").textContent;

    for (let i=1; i < allWorkshopLabels.length; i++) {
      if (allWorkshopLabels[i].querySelector(".activity-day").textContent == day &&
      allWorkshopLabels[i].querySelector(".activity-start-time").textContent == startTime &&
      allWorkshopLabels[i].querySelector("input").getAttribute("name") != target.getAttribute("name"))
      {
        allWorkshopLabels[i].querySelector("input").disabled = status == "disable" ? true : false;
        allWorkshopLabels[i].style.color = status == "disable" ? "grey" : "";
      }
    }
  }

};

const currentPrice = (target, removePrev) => {

  /*
    Calculate total price, remove previous price from the DOM,
    create new "p" element, and assign the price to it.
  */
  let priceCalc = 0;
  for (let i=0; i < selectedActivities.length; i++) {
    priceCalc += parseInt( selectedActivities[i].parentNode.querySelector(".activity-price").textContent );
  }
  if (removePrev) {
    const prevPrice = activitiesFieldSet.querySelector("p");
    prevPrice.parentNode.removeChild( prevPrice );
  }
  const totalPrice = document.createElement("p");
  totalPrice.style.display = "block";
  totalPrice.style.textAlign = "center";
  totalPrice.textContent = "Total: $" + priceCalc;
  // Append price to fieldset. If price is $0, do not display it.
  activitiesFieldSet.append(totalPrice);
  activitiesFieldSet.querySelector("p").style.display = selectedActivities.length == 0 ? "none" : "";

};

const validateForm = () => {

  /*
    Checks to see if name is not blank, email is correctly formatted,
    a shirt design is chosen, at least one activity is selected,
    and one payment option is selected. If payment option is credit card,
    checks for credit card, zipcode, and cvv length, and that only numbers
    were entered. Returns an array with all the invalid elements.
  */
  const invalidElements = [];

  if ( name.value == "" ) {
    invalidElements.push(name);
  } if ( document.querySelector("input[id='mail']:invalid") != null || email.value.length == 0) {
    invalidElements.push(email);
  } if ( designSelect.value == "Select Theme" ) {
    invalidElements.push(designSelect);
  } if ( selectedActivities.length === 0 ) {
    invalidElements.push(activitiesFieldSet);
  } if ( payment.value == "select_method" ) {
    invalidElements.push(payment);
  } if ( (cc.value.length < 13 || cc.value.length > 16 || isNaN(cc.value)) && payment.value == "credit card") {
    invalidElements.push(cc);
  } if ( (zip.value.length != 5 || isNaN(zip.value)) && payment.value == "credit card") {
    invalidElements.push(zip);
  } if ( (cvv.value.length != 3 || isNaN(cvv.value)) && payment.value == "credit card") {
    invalidElements.push(cvv);
  }

  return invalidElements;

};

const validationMessages = ( invalidElements ) => {

  /*
    Removes previous message. Creates a new blank message
    and appends an error message for each error in the form.
    Displays message to user at the bottom of the page.
  */
  if ( document.querySelector(".messageDiv") != null ) {
    document.querySelector(".messageDiv").remove();
  }
  const messageDiv = document.createElement("div");
  let message = "";

  for (let i=0; i < invalidElements.length; i++) {
    if ( invalidElements[i].getAttribute("id") == "name" ) {
      message += "<p>Please type in your name.</p>";
    } else if ( invalidElements[i].getAttribute("id") == "mail" ) {
      message += "<p>Please provide a valid email.</p>";
    } else if ( invalidElements[i].value == "Select Theme" ) {
      message += "<p>Please select a t-shirt design and color.</p>";
    } else if ( invalidElements[i].className == "activities" ) {
      message += "<p>At least one activity must be selected.</p>";
    } else if ( invalidElements[i].value == "select_method" ) {
      message += "<p>Please select a payment method.</p>";
    } else if ( invalidElements[i].getAttribute("id") == "cc-num" ) {
      message += "<p>Please enter a valid credit card.</p>";
    } else if ( invalidElements[i].getAttribute("id") == "zip" ) {
      message += "<p>Please enter a valid zipcode.</p>";
    } else if ( invalidElements[i].getAttribute("id") == "cvv" ) {
      message += "<p>Please enter a valid CVV number.</p>";
    }
    styleErrorElement(invalidElements[i]);
  }

  messageDiv.className = "messageDiv";
  messageDiv.innerHTML = message;
  messageDiv.style.color = "#cc0000";
  document.getElementsByTagName("form")[0].appendChild(messageDiv);

};

const styleErrorElement = (element) => {

  /*
    Applies styling changes to let user know
    when an element contains an error.
  */
  if (element.tagName == "INPUT" || element.tagName == "SELECT") {
    element.style.border = "#cc0000 2px solid";
    if ( element.getAttribute("id") == "cc-num" && payment.value == "select_method" ) {
      ccDiv.style.display = "";
      payment.value = "credit card";
    }
  } else if (element.tagName == "FIELDSET") {
    element.children[0].style.borderTop = "#cc0000 2px solid";
    element.children[0].style.color = "#cc0000";
  }
};

const clearFormErrors = () => {

  /*
    Clears any styling from error elements.
  */
  name.style.border = "";
  email.style.border = "";
  design.style.border = "";
  activitiesFieldSet.children[0].style.border = "";
  activitiesFieldSet.children[0].style.color = "";
  payment.style.border = "";
  cc.style.border = "";
  zip.style.border = "";
  cvv.style.border = "";

};
