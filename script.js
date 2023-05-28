function checkInputRegex(inputToCheck) {
  const x = {
    email:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    country: /^[a-zA-Z ]+$/,
    postcode: /^\d{4}\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$/,
    password: /^[a-zA-Z0-9 !@#\$%&*\(\)]{8,}$/,
  };

  for (let [key, regex] of Object.entries(x)) {
    const constraint = RegExp(regex, "i");
    const inputElement = document.getElementById(key);
    const isValid = constraint.test(inputElement.value);
    console.log(`${key}: ${isValid}`);
  }
}

function checkPasswordConfirm() {
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("password-confirm");

  console.log(passwordInput.value === passwordConfirmInput.value);
}
