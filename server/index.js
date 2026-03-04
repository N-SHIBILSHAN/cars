import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

import Enquiry from "./models/Enquiry.js"
import vehicleRoutes from "./routes/VehicleRoutes.js"

dotenv.config()

const app = express()

/* ============================= */
/* ✅ MIDDLEWARE */
/* ============================= */
app.use(cors())
app.use(express.json())

/* ============================= */
/* 🚗 VEHICLE ROUTES */
/* ============================= */
app.use("/api/vehicles", vehicleRoutes)

/* ============================= */
/* 🗄️ MongoDB CONNECT */
/* ============================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err))

/* ============================= */
/* 📧 MAIL TRANSPORTER */
/* ============================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

/* ============================= */
/* 📩 ENQUIRY ROUTE */
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
/* 🚀 SERVER START */
/* ============================= */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))