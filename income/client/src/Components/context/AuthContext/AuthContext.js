import { createContext, useReducer } from "react";
import axios from "axios";
import { API_URL_USER } from "../../../utils/apiURL";

export const authContext = createContext();
//initial state
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  error: null,
  loading: false,
  profile: null,
};
//Auth Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      //add user to the storage
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        profile: payload,
      };
    case "FETCH_FAILED":
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };
    case "LOGOUT":
      localStorage.removeItem("userAuth");
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: null,
      };
  }
};
//provider
const AuthContextProvider = ({ children }) => {
  //dispatch is action
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  //Login action
  const loginUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_USER}/login`, formData, config);
      // const res = await axios.post(
      //   "http://localhost:9000/api/V1/users/login",
      //   formData,
      //   config
      // );

      if (res?.data?.status == "Login success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
        window.location.href = "/dashboard";
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILED",
        payload: error?.response?.data?.message,
      });
    }
  };
  //profile action
  const fetchProfileAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `aa ${state?.userAuth?.token}`,
      },
    };

    try {
      const res = await axios.get(`${API_URL_USER}/profile`, config);
      if (res?.data) {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "FETCH_FAILED",
        payload: error?.response?.data?.message,
      });
    }
  };
  //Registeration
  const registerUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${API_URL_USER}/register`,
        formData,
        config
      );
      console.log("eee");

      if (res?.data?.status == "success") {
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: res.data,
        });
      }
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      dispatch({
        type: "REGISTER_FAIL",
        payload: error?.response?.data?.message,
      });
    }
  };

  //logout
  const logoutAction = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.location.href = "/login";
  };

  return (
    <authContext.Provider
      value={{
        fetchProfileAction,
        loginUserAction,
        userAuth:
          typeof state.userAuth === "object"
            ? JSON.stringify(state.userAuth)
            : state.userAuth,
        token: state?.userAuth?.token,
        profile: state?.profile,
        error: state?.error,
        logoutAction,
        registerUserAction,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
