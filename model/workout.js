const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: Number,
    sets: Number,
    weight: Number
});

const workoutSchema = new mongoose.Schema({
    user: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    caloriesBurned: Number,
    exercises: [exerciseSchema]
});

module.exports = mongoose.model("Workout", workoutSchema);
