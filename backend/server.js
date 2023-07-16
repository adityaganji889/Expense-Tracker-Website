const express = require("express")
const app = express();
const cors = require("cors");
require("dotenv").config()
const db = require("./config/db");
const port = process.env.PORT || 8080
const userRoute = require("./routes/userRoutes");
const transactionRoute = require('./routes/transactionRoutes')

app.use(cors());
app.use(express.json({
    limit: "50mb",
}));

app.use("/api/users",userRoute);
app.use("/api/transactions",transactionRoute);

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})


