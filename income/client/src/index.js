import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContextProvider from "./Components/context/AuthContext/AuthContext";
import AccountContextProvider from "./Components/context/AccountContext/AccountContext";
import TransContextProvider from "./Components/context/TransactionContext/TransContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <AccountContextProvider>
      <TransContextProvider>
        <App />
      </TransContextProvider>
    </AccountContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
