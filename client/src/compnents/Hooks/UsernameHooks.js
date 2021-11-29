import { useState, useEffect } from "react";
import { isAlpha, isEmpty } from "validator";

function UserNameHooks() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const [onBlur, setOnBlur] = useState(false);

  useEffect(() => {
    if (onFocus) {
      if (userName.length > 0) {
        if (!isAlpha(userName)) {
          setError(
            "Username cannot have special characters, numbers or spaces"
          );
        }

        if (isAlpha(userName)) {
          setError("");
        }
      }
    }

    if (onBlur) {
      if (isEmpty(userName)) {
        setError("Username cannot be empty");
      }
    }
  }, [userName, onFocus, onBlur]);

  function handleUserNameOnChange(e) {
    setUserName(e.target.value);
  }

  return [userName, handleUserNameOnChange, error, setOnFocus, setOnBlur];
}

export default UserNameHooks;
