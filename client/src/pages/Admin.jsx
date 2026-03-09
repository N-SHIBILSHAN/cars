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

      setForm({
        name: "",
        price: "",
        category: "",
        year: "",
        hp: "",
        fuel: "",
        image: "",
      })
    } catch (err) {
      console.error(err)
      alert("Failed to add vehicle ❌")
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-gray-100 p-6 rounded-xl"
      >
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-3 rounded border" />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="p-3 rounded border" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="p-3 rounded border" />
        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} className="p-3 rounded border" />
        <input name="hp" placeholder="HP" value={form.hp} onChange={handleChange} className="p-3 rounded border" />
        <input name="fuel" placeholder="Fuel" value={form.fuel} onChange={handleChange} className="p-3 rounded border" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="p-3 rounded border" />

        <button
          type="submit"
          className="bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  )
}

export default Admin
