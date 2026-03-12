import { useState, useEffect } from "react"
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

  const [cars, setCars] = useState([])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const fetchCars = async () => {
    try {
      const res = await axios.get("/api/vehicles")
      setCars(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

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

      fetchCars()

    } catch (err) {
      console.error(err)
      alert("Failed to add vehicle ❌")
    }
  }

  const deleteCar = async (id) => {
    try {
      await axios.delete(`/api/vehicles/${id}`)
      fetchCars()
    } catch (err) {
      console.error(err)
    }
  }

  const markSold = async (id) => {
    try {
      await axios.patch(`/api/vehicles/${id}/sold`)
      fetchCars()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Add Vehicle Form */}

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-gray-100 p-6 rounded-xl mb-10"
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

      {/* Vehicle Inventory */}

      <h2 className="text-2xl font-semibold mb-4">Inventory</h2>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Car</th>
            <th className="p-3">Price</th>
            <th className="p-3">Year</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>

          {cars.map((car) => (

            <tr key={car._id} className="border-t">

              <td className="p-3">{car.name}</td>

              <td className="p-3">₹{car.price}</td>

              <td className="p-3">{car.year}</td>

              <td className="p-3">{car.status}</td>

              <td className="p-3 flex gap-2">

                <button
                  onClick={() => markSold(car._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Sold
                </button>

                <button
                  onClick={() => deleteCar(car._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Admin
