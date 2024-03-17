import axios from "axios";
import { createContext, useReducer } from "react";
import { API_URL_TRS } from "../../../utils/apiURL";

export const transContext = createContext();
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
};
const transReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "TRANS-CREATED_SUCCESS":
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case "TRANS-CREATED_FAIL":
      return {
        ...state,
        loading: false,
        error: payload,
      };
  }
};
const TransContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transReducer, INITIAL_STATE);
  console.log(state?.userAuth?.token);
  const createTransAction = async (transData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `aa ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(`${API_URL_TRS}`, transData, config);
      console.log(res.data);
      if (res?.data?.status == "sucess") {
        dispatch({
          type: "TRANS_CREATED_SUCCESS",
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "TRANS_CREATED_FAIL",
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <transContext.Provider value={{ createTransAction }}>
      {children}
    </transContext.Provider>
  );
};
export default TransContextProvider;
