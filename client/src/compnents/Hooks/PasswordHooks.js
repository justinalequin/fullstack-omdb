import { useState, useEffect } from "react";
import { isEmpty, isStrongPassword } from "validator";

function PasswordHooks() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordOnFocus, setPasswordOnFocus] = useState(false);
  const [passwordOnBlur, setPasswordOnBlur] = useState(false);

  useEffect(() => {
    if (passwordOnFocus) {
      if (password.length > 0) {
        if (
          !isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbol: 1,
          })
        ) {
          setPasswordError(
            "Your password does not meet the standards. Please try again."
          );
        }

        if (
          isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbol: 1,
          })
        ) {
          setPasswordError("Your password meets the standards.");
        }
      }
    }

    if (passwordOnBlur) {
      if (isEmpty(password)) {
        setPasswordError(
          "The password field cannot be left empty. Please try again."
        );
      }
    }
  }, [password, passwordOnFocus, passwordOnBlur]);

  function handlePasswordOnChange(e) {
    setPassword(e.target.value);
  }

  return [
    password,
    handlePasswordOnChange,
    passwordError,
    setPasswordOnFocus,
    setPasswordOnBlur,
  ];
}

export default PasswordHooks;
