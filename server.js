require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();
const PORT = process.env.PORT;
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("MongoDB connection error:", err));


app.use("/workouts", workoutRoutes);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
