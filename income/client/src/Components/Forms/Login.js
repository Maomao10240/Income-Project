import React, { useContext } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

const Login = () => {
  //data inside of our value provider
  const loginUserAction = useContext(authContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  //onChange
  const onChangeInput = (e) => {
    console.log("onChange triggered");
  };
  //onsubmit
  const onSubmitHandler = (e) => {
    console.log("onSubmit triggered");
  };
  return (
    <section>
      <div>
        <h3>Sign in to your account</h3>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Email</label>
          <input
            className="border-coolGray-200"
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label>Password</label>
          <input placeholder="Password" />
        </div>
      </form>
    </section>
  );
};

export default Login;
