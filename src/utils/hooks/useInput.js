import React from 'react';

function useInput(val, isVal) {
  
  const [value, setValue] = React.useState(val);
  const [isValid, setIsValid] = React.useState(isVal);
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