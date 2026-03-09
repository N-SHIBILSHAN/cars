import { useState } from "react"
import axios from "axios"

function Admin() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    year: "",
    hp: "",
    fuel: "",
    image: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("/api/vehicles", {
        ...form,
        price: Number(form.price),
        year: Number(form.year),
        hp: Number(form.hp),
      })

      alert("Vehicle added ✅")
    } catch (err) {
      alert("Failed to add vehicle ❌")
    }
  }

  return (
    <div>
      <h1>Admin Panel</h1>
    </div>
  )
}

export default Admin
