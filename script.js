const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const postalInput = document.getElementById("postal-code");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const form = document.querySelector("form");

//Error box elements

const errorBox = document.getElementById("error-box");
const errorMessage = document.getElementById("error-message");

//Show and hide error box
function showErrorBox(inputElement) {
  if (!inputElement.validity.valid) {
    errorBox.classList.add("show");
    errorBox.classList.add("error"); // Add error class for red styling
    errorBox.classList.remove("success"); // Remove success class if it exists
    errorMessage.textContent = inputElement.validationMessage;
  }
}

function hideErrorBox() {
  errorBox.classList.remove("show");
  errorBox.classList.remove("error");
  errorBox.classList.remove("success");
  errorMessage.textContent = "";
}

//Validate email
function validateEmail() {
  emailInput.setCustomValidity("");
  
  const email = emailInput.value;
  
  // Check for @ symbol and basic email format (type="email" does this, but we customize the message)
  if (email && !email.includes("@")) {
    emailInput.setCustomValidity("Email must contain an @ symbol!");
  } else if (email && !email.includes(".")) {
    emailInput.setCustomValidity("Email must contain a dot (.)!");
  }

  if (emailInput.validity.valid) {
    hideErrorBox();
  } else {
    showErrorBox(emailInput);
  }
}

//Validate country
function validateCountry() {
  countryInput.setCustomValidity("");

  if (countryInput.validity.valid) {
    hideErrorBox();
  } else {
    showErrorBox(countryInput);
  }
}

//Validate postal code
function validatePostal() {
  postalInput.setCustomValidity("");
  
  const postal = postalInput.value;
  
  // Check if field is empty (required handles this)
  if (postal === "") {
    postalInput.setCustomValidity("Postal code is required!");
  } else if (isNaN(postal)) {
    // Check if it's not a number
    postalInput.setCustomValidity("Postal code must contain only numbers!");
  }

  if (postalInput.validity.valid) {
    hideErrorBox();
  } else {
    showErrorBox(postalInput);
  }
}

//Validate password and confirm
function validatePassword() {
  passwordInput.setCustomValidity("");

  const password = passwordInput.value;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasUppercase) {
    passwordInput.setCustomValidity("Must contain an UPPERcase letter!");

  } else if (!hasNumber) {
    passwordInput.setCustomValidity("Must contain a number!");

  }

  if (passwordInput.validity.valid) {
    hideErrorBox();
  } else {
    showErrorBox(passwordInput);
  }
}

function validateConfirm() {
  confirmInput.setCustomValidity("");
  const confirm = confirmInput.value;
  const password = passwordInput.value;

  if (confirm !== password && confirm !== "") {
    confirmInput.setCustomValidity("Passwords do not match!");
  }

  if (confirmInput.validity.valid) {
    hideErrorBox();
  } else {
    showErrorBox(confirmInput);
  }
}

// When user FOCUSES on a field
emailInput.addEventListener("focus", validateEmail);
countryInput.addEventListener("focus", validateCountry);
postalInput.addEventListener("focus", validatePostal);
passwordInput.addEventListener("focus", validatePassword);
confirmInput.addEventListener("focus", validateConfirm);
 
// When user TYPES in a field
emailInput.addEventListener("input", validateEmail);
countryInput.addEventListener("input", validateCountry);
postalInput.addEventListener("input", validatePostal);
passwordInput.addEventListener("input", validatePassword);
confirmInput.addEventListener("input", validateConfirm);

// When user LEAVES a field
emailInput.addEventListener("blur", validateEmail);
countryInput.addEventListener("blur", validateCountry);
postalInput.addEventListener("blur", validatePostal);
passwordInput.addEventListener("blur", validatePassword);
confirmInput.addEventListener("blur", validateConfirm);

//Handle submit
function handleSubmit(event) {
  event.preventDefault();
  
  validateEmail();
  validateCountry();
  validatePostal();
  validatePassword();
  validateConfirm();
  
  if (form.checkValidity()) {
    // FORM IS VALID - Show success message with green styling
    errorBox.classList.add("show");
    errorBox.classList.add("success"); // Add success class for green styling
    errorBox.classList.remove("error"); // Remove error class if it exists
    errorMessage.textContent = "HIGH FIVE! 🎉 Form submitted successfully!";
    
    // Reset form after 2 seconds
    setTimeout(() => {
      form.reset();
      errorBox.classList.remove("show");
      errorBox.classList.remove("success");
    }, 2000);
  } else {
    // FORM IS INVALID - Show error message with red styling
    errorBox.classList.add("show");
    errorBox.classList.add("error"); // Add error class for red styling
    errorBox.classList.remove("success"); // Remove success class if it exists
    errorMessage.textContent = "Please fix all errors before submitting";
  }
}

form.addEventListener("submit", handleSubmit);