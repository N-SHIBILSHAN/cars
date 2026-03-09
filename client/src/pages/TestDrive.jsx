import { useState } from "react"

export default function TestDrive() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(
        "https://cars-ex3y.onrender.com/api/enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            type: "test-drive",
          }),
        }
      )

      if (res.ok) {
        alert("Test drive booked 🚀")
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        alert("Failed to book test drive")
      }

    } catch (error) {
      console.error(error)
      alert("Server error")
    }
  }

  return (
    <section className="pt-28 p-6">
      <h1 className="text-3xl font-bold mb-6">Schedule Test Drive</h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="message"
          placeholder="Preferred car & date"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <button className="w-full bg-black text-white py-3 rounded">
          Book Test Drive
        </button>

      </form>
    </section>
  )
}
