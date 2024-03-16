import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Register";
import NavBar from "./Components/NavBar/Navbar";
import AddTransaction from "./Components/Forms/AddTransaction";
import AccountDashboard from "./Components/DashBoard/AccountDashboard";
import AccountDetails from "./Components/DashBoard/AccountDetails";
import AddAccount from "./Components/Forms/AddAccount";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<AccountDashboard />} />
        <Route
          path="/account-details/:accountID"
          element={<AccountDetails />}
        />
        <Route path="/add-account" element={<AddAccount />} />

        <Route path="/addTransaction" element={<AddTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
