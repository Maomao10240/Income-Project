import axios from "axios";
import { createContext, useReducer } from "react";
import { API_URL_ACC } from "../../../utils/apiURL";

export const accountContext = createContext();
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  account: null,
  accounts: [],
  loading: false,
  error: null,
};
const accountReducer = (state, action) => {
  console.log("why");
  const { type, payload } = action;
  console.log("test c");

  switch (type) {
    case "ACCOUNT_CREATION_SUCCES":
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case "ACCOUNT_CREATION_FAIL":
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    case "ACCOUNT_DETAILS_SUCCES":
      console.log("test sc");
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case "ACCOUNT_DETAILS_FAIL":
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);
  console.log(state);
  const getAccountDetailsAction = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `aa ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_ACC}/${id}`, config);
      //console.log(res.data);
      if (res?.data?.status == "sucess") {
        dispatch({
          type: "ACCOUNT_DETAILS_SUCCES",
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "ACCOUNT_DETAILS_FAIL",
        payload: error?.data?.response?.message,
      });
    }
  };
  const createAccountAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `aa ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(
        `${API_URL_ACC}/add-account`,
        formData,
        config
      );
      console.log(res);
      if (res?.data?.status == "success") {
        console.log(res);

        dispatch({
          type: "ACCOUNT_CREATION_SUCCES",
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ACCOUNT_CREATION_FAIL",
        payload: error?.response?.message,
      });
    }
  };
  return (
    <accountContext.Provider
      value={{
        getAccountDetailsAction,
        account: state?.account,
        createAccountAction,
        // error: state?.error,
      }}
    >
      {children}
    </accountContext.Provider>
  );
};
export default AccountContextProvider;
