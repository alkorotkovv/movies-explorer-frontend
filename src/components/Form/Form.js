function Login(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    const dataObject = {name: props.inName, email: props.inEmail, password: props.inPassword}
    //props.onSubmit(props.inName, props.inEmail, props.inPassword);
    props.onSubmit(dataObject);
  }

  return (
    <form className={`form form_type_${props.type}`} name={`form_${props.name}`} noValidate onSubmit={handleSubmit} >
      {props.children}
    </form>
  )
}

export default Login;
