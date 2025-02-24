const express = require("express");
const Workout = require("../model/workout");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const workout = new Workout(req.body);
        await workout.save();
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: `Validation failed: ${error.message}` });
    }
});


router.get("/:id?", async (req, res) => {
    try {
        if (req.params.id) {
            const workout = await Workout.findById(req.params.id);
            if (!workout) return res.status(404).json({ error: "Workout not found" });
            return res.json(workout);
        }
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!workout) return res.status(404).json({ error: "Workout not found" });
        res.json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) return res.status(404).json({ error: "Workout not found" });
        res.json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;
