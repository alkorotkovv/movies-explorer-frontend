function Login(props) {

  return (
    <form className={`form form_type_${props.type}`} name={`form_${props.name}`} noValidate>
      {props.children}
    </form>
  )
}

export default Login;
