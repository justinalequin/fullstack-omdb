import { useState, useEffect } from "react";
import { isEmpty, isEmail } from "validator";

function Email() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailOnFocus, setEmailOnFocus] = useState(false);
  const [emailOnBlur, setEmailOnBlur] = useState(false);

  useEffect(() => {
    if (emailOnFocus) {
      if (email.length > 0) {
        if (!isEmail(email)) {
          setError("Please enter a valid email");
        }

        if (isEmail(email)) {
          setError("");
        }
      }
    }

    if (emailOnBlur) {
      if (isEmpty(email)) {
        setError("Email cannot be empty");
      }
    }
  }, [email, emailOnFocus, emailOnBlur]);

  function handleEmailOnChange(e) {
    setEmail(e.target.value);
  }

  return [email, handleEmailOnChange, error, setEmailOnFocus, setEmailOnBlur];
}

export default Email;
