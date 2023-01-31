const validateName = (name) => {
  const nameRegex = new RegExp(/[a-zA-z][a-zA-z]+[a-zA-z]$/);
  return nameRegex.test(name);
};

const validateEmail = (email) => {
  const emailRegex = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "gm"
  );
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const pwdRegex = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$"
  );
  return pwdRegex.test(password);
};

module.exports = { validateName, validateEmail, validatePassword };
