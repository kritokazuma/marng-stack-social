module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must be provided";
  }

  if (email.trim() === "") {
    errors.email = "Email must be provided";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Please provide a valid email";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must be provided";
  } else if (password !== confirmPassword) {
    errors.password = "Password must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must be provided";
  }

  if (password.trim() === "") {
    errors.password = "Password must be provided";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
