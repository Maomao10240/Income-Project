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
      <div className="max-w-sm mx-auto">
        <div>
          {" "}
          <h3 className="mb-4 text-2xl md:text-3xl font-bold">
            Sign in to your account
          </h3>
          <p>
            {userAuth?.error && (
              <span className="text-red-500">{userAuth?.error}</span>
            )}
          </p>
        </div>
        <div>
          <form onSubmit={onSubmitHandler}>
            <div>
              <label>Email</label>
              <input
                name="email"
                onChange={onChangeInput}
                value={email}
                className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lgshadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="email"
                placeholder="Email"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                onChange={onChangeInput}
                className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lgshadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                placeholder="Password"
              />
            </div>
            <div>
              <label>
                <input type="checkbox" />
              </label>
            </div>
            <button
              className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
              type="submit"
            >
              Sign in
            </button>
            <p>
              <span>
                Don't have an account? <a href="/register">Sign up</a>
              </span>
            </p>
            <button
              className="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
              type="submit"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
