const express = require("express");
require("./config/dbConnect");
const app = express();
const userRoute = require("./route/Users/userRoute");
const accountRoute = require("./route/Accounts/accountRoute");
const transactionRoute = require("./route/Transactions/transactionRoute");
//users route
//POST/api/v1/users
app.use("/api/v1/users", userRoute);

//account route
app.use("/api/v1/accounts", accountRoute);
app.use("/api/v1/transactions", transactionRoute);

//transactions route

//listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is running now on ${PORT}`));
