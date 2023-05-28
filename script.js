function checkInputRegex(inputDomID, regexConstraint) {
  const inputElement = document.getElementById(inputDomID);
  const isValid = regexConstraint.test(inputElement.value);
  return isValid;
}

function checkPasswordConfirm() {
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("password-confirm");

  const isValid = passwordInput.value === passwordConfirmInput.value;
  passwordConfirmInput.setCustomValidity(isValid ? "" : "Passwords must match");
}

function createCheckObject(domID, regex, regexFlag, errorMessage) {
  function getDomID() {
    return domID;
  }
  function getConstraint() {
    return new RegExp(regex, regexFlag);
  }
  function getErrorMessage() {
    return errorMessage;
  }

  return {
    getDomID,
    getConstraint,
    getErrorMessage,
  };
}

function checkInputs() {
  const regexChecks = [
    createCheckObject(
      "email",
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "",
      "No valid email"
    ),
    createCheckObject(
      "country",
      /^[a-zA-Z ]+$/,
      "",
      "Country name can only contain letters/spaces"
    ),
    createCheckObject(
      "postcode",
      /^\d{4}\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$/,
      "i",
      "Not a valid postal code"
    ),
    createCheckObject("password", /^.{8,}$/, "", "At least 8 characters"),
    createCheckObject(
      "password",
      /^[a-zA-Z0-9 !@#\$%&*\(\)]+$/,
      "",
      "Only letters, numbers and !@#$*() are allowed."
    ),
  ];

  let invalidKeys = [];

  for (let regexCheck of regexChecks) {
    const domID = regexCheck.getDomID();
    if (invalidKeys.includes(domID)) {
      continue; // no further checking on this field
    }
    const constraint = regexCheck.getConstraint();
    const isValid = checkInputRegex(domID, constraint);

    if (!isValid) {
      invalidKeys.push(domID);
    }
    const customValidity = isValid ? "" : regexCheck.getErrorMessage();
    document.getElementById(domID).setCustomValidity(customValidity);
  }

  console.log(checkPasswordConfirm());
}

const submitButton = document.querySelector(".submit-wrapper button");
submitButton.addEventListener("click", checkInputs);
