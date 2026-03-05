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

    await fetch("http://localhost:5000/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        type: "test-drive",
      }),
    })

    alert("Test drive booked 🚀")
  }

  return (
    <section className="pt-28 p-6">
      <h1 className="text-3xl font-bold mb-6">Schedule Test Drive</h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-3 border rounded" />
        <textarea name="message" placeholder="Preferred car & date" onChange={handleChange} className="w-full p-3 border rounded" />
        <button className="w-full bg-black text-white py-3 rounded">
          Book Test Drive
        </button>
      </form>
    </section>
  )
}