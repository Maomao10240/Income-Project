import { createContext, useReducer } from "react";
import axios from "axios";

export const authContext = createContext();
//initial state
const INITIAL_STATE = {
  userAuth: null,
  error: null,
  loading: false,
  profile: null,
};
//Auth Reducer
const reducer = (state, action) => {
  return {};
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
      const res = axios.post(
        "http://localhost:9000/api/V1/users/login",
        formData,
        config
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider value={{ loginUserAction }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
