const express = require("express");
require("./config/dbConnect");
const app = express();
const userRoute = require("./route/Users/userRoute");
const accountRoute = require("./route/Accounts/accountRoute");
const transactionRoute = require("./route/Transactions/transactionRoute");
const globalErrHand = require("./middlewares/globalErrHand");
//users route
//POST/api/v1/users
app.use(express.json());

app.use("/api/v1/users", userRoute);
//pass incoming data

//account route
app.use("/api/v1/accounts", accountRoute);
app.use("/api/v1/transactions", transactionRoute);
app.use(globalErrHand);

//transactions route

//listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is running now on ${PORT}`));
