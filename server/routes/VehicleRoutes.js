import express from "express"
import Car from "../models/Vehicle.js"

const router = express.Router()

// ✅ GET all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 })
    res.json(cars)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ✅ GET featured cars (HOME PAGE)
router.get("/featured", async (req, res) => {
  try {
    const cars = await Car.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(3)
    res.json(cars)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ✅ GET single car by ID ⭐⭐⭐ (FIXED)
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)

    if (!car) {
      return res.status(404).json({ message: "Vehicle not found" })
    }

    res.json(car)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ✅ ADD car (ADMIN)
router.post("/", async (req, res) => {
  try {
    const car = new Car(req.body)
    await car.save()
    res.status(201).json(car)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ✅ DELETE car (ADMIN)
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id)
    res.json({ message: "Car deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router