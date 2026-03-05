import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import Enquiry from "./models/Enquiry.js"
import vehicleRoutes from "./routes/VehicleRoutes.js"

dotenv.config()

const app = express()

/* ============================= */
/* FIX __dirname for ES Modules */
/* ============================= */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* ============================= */
/* MIDDLEWARE */
/* ============================= */

app.use(cors())
app.use(express.json())

/* ============================= */
/* VEHICLE ROUTES */
/* ============================= */

app.use("/api/vehicles", vehicleRoutes)

/* ============================= */
/* MONGODB CONNECTION */
/* ============================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err))

/* ============================= */
/* EMAIL TRANSPORTER */
/* ============================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

/* ============================= */
/* ENQUIRY API */
/* ============================= */

app.post("/api/enquiry", async (req, res) => {
  try {
    const { name, email, phone, message, type } = req.body

    await Enquiry.create({
      name,
      email,
      phone,
      message,
      type,
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New ${type} enquiry`,
      html: `
        <h3>New Enquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})

/* ============================= */
/* SERVE VITE FRONTEND */
/* ============================= */

app.use(express.static(path.join(__dirname, "../client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
})

/* ============================= */
/* SERVER START */
/* ============================= */

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})