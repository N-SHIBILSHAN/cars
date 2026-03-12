import express from "express"
import Car from "../models/Vehicle.js"

const router = express.Router()

// =============================
// GET ALL CARS
// =============================
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 })
    res.json(cars)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// =============================
// GET FEATURED CARS (HOME PAGE)
// =============================
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

// =============================
// GET SINGLE CAR
// =============================
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

// =============================
// ADD CAR (ADMIN)
// =============================
router.post("/", async (req, res) => {
  try {
    const car = new Car(req.body)
    await car.save()

    res.status(201).json(car)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// =============================
// UPDATE CAR (EDIT)
// =============================
router.put("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!car) {
      return res.status(404).json({ message: "Vehicle not found" })
    }

    res.json(car)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// =============================
// MARK CAR AS SOLD
// =============================
router.patch("/:id/sold", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { status: "sold" },
      { new: true }
    )

    res.json(car)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// =============================
// DELETE CAR
// =============================
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id)

    if (!car) {
      return res.status(404).json({ message: "Vehicle not found" })
    }

    res.json({ message: "Car deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
