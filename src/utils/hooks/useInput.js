import React from 'react';

function useInput() {
  
  const [value, setValue] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [message, setMessage] = React.useState("");
  

  function handleChange(evt) {
    setValue(evt.target.value);
    setIsValid(evt.target.validity.valid);
    if (!evt.target.validity.valid)
      setMessage(evt.target.validationMessage)
      //setMessage("Некорректно заполнено поле")
    else
      setMessage("")
  }

  return {
    value,
    isValid,
    message,
    handleChange
  }

}

export default useInput;