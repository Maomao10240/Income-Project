const express = require("express");
const app = express();

//listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running now"));
