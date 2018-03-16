/*
  This script is used to declare all global variables
*/
const name = document.getElementById("name");

const email = document.getElementById("mail");

const designSelect = document.getElementById("design");

const designs = ["js puns", "heart js"];

const colorDiv = document.getElementById("colors-js-puns");

const colorOptions = document.getElementById("color").children;

const activitiesFieldSet = document.querySelector(".activities");

const selectedActivities = [];

const allWorkshopLabels = document.querySelectorAll(".activities label");

const ccDiv = document.getElementById("credit-card");

const paypalDiv = ccDiv.nextElementSibling;

const bitcoinDiv = paypalDiv.nextElementSibling;

const payment = document.getElementById("payment");

const cc = document.getElementById("cc-num");

const zip = document.getElementById("zip");

const cvv = document.getElementById("cvv");

const submitButton = document.querySelector("button[type='submit']");
