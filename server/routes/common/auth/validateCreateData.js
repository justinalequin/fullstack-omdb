const {
  isEmail,
  isStrongPassword,
  isAlphanumeric,
  isAlpha,
} = require("validator");

function validateCreateData(req, res, next) {
  const { firstName, lastName, userName, email, password } = req.body;
  let errObj = {};

  if (!isAlpha(firstName)) {
    errObj.firstName = "First Name cannot have special characters or numbers";
  }

  if (!isAlpha(lastName)) {
    errObj.lastName = "Last Name cannot have special characters or numbers";
  }

  if (!isAlphanumeric(userName)) {
    errObj.userName = "UserName cannot have special characters";
  }

  if (!isEmail(email)) {
    errObj.email = "Please enter a valid email";
  }

  if (!isStrongPassword(password)) {
    errObj.password =
      "Must contain 1 UPPERCASE, 1 LOWERCASE, 1 NUMBER, 1 SPECIAL CHARACTER, and be at least 8 CHARACTERS LONG!";
  }

  if (Object.keys(errObj).length > 0) {
    return res.status(500).json({
      message: "error",
      error: errObj,
    });
  } else {
    next();
  }
}

module.exports = {
  validateCreateData,
};
