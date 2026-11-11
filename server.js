import express from "express";
import roomRoute from "./src/routes/roomRoute.js";
import bookingRoute from "./src/routes/bookingRoute.js";


const app = express();

app.use(express.json());
app.use('/api', roomRoute);
app.use('/api', bookingRoute);



app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})  