const mongoose = require("mongoose");
//connect
const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://maohua:88273189pmh*M@cluster0.gvwlkrm.mongodb.net/income-app?retryWrites=true&w=majority"
    );
    console.log("db connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
dbConnect();
