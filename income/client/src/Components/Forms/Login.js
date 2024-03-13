import React, { useContext, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

const Login = () => {
  //data inside of our value provider
  const { loginUserAction, userAuth } = useContext(authContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  //onChange
  const onChangeInput = (e) => {
    //console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //onsubmit
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("onSubmit triggered");
    loginUserAction(formData);
  };
  return (
    <section>
      <div>
        <h3 className="mb-4 text-2xl md:text-3xl font-bold">
          Sign in to your account
        </h3>
        <p>
          {userAuth}

          {userAuth?.error && (
            <span className="text-red-500">{userAuth?.error}</span>
          )}
        </p>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Email</label>
          <input
            name="email"
            onChange={onChangeInput}
            value={email}
            className="appearance-none block w-full p-3 border-coolGray-200 focus: outline-none"
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            onChange={onChangeInput}
            className="appearance-none block w-full p-3 border-coolGray-200 focus: outline-none"
            placeholder="Password"
          />
        </div>
        <div>
          <label>
            <input type="checkbox" />
          </label>
        </div>
        <button className="inline-block py-3" type="submit">
          Sign in
        </button>
        <p>
          <span>
            Don't have an account? <a href="#">Sign up</a>
          </span>
        </p>
        <button
          className="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </section>
  );
};

export default Login;
