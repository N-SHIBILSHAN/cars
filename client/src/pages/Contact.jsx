import { useState } from "react"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch("http://localhost:5000/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          type: "contact",
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setForm({ name: "", email: "", phone: "", message: "" })
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="pt-28 pb-16 px-6 md:px-16 bg-white min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Contact Royal Cars
          </h1>

          <p className="text-gray-600 mb-10">
            Have questions or want to schedule a test drive? Send us a message
            and our team will get back to you quickly.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* LEFT INFO */}
            <div>
              <h3 className="text-xl font-semibold mb-4">📍 Showroom</h3>
              <p className="text-gray-600 mb-4">
                Royal Cars, Palakkad, Kerala, India
              </p>

              <h3 className="text-xl font-semibold mb-4">📞 Phone</h3>
              <p className="text-gray-600 mb-4">+91 98765 43210</p>

              <h3 className="text-xl font-semibold mb-4">✉️ Email</h3>
              <p className="text-gray-600 mb-6">
                sales@royalcars.com
              </p>

              {/* Google Map */}
              <iframe
                src="https://www.google.com/maps?q=Palakkad,Kerala&output=embed"
                className="w-full h-[260px] rounded-2xl border"
                loading="lazy"
                title="map"
              />
            </div>

            {/* RIGHT FORM */}
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 p-6 rounded-2xl shadow-md"
            >
              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                  ✅ Enquiry sent successfully!
                </div>
              )}

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full mb-4 p-3 rounded-lg border"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mb-4 p-3 rounded-lg border"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full mb-4 p-3 rounded-lg border"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full mb-4 p-3 rounded-lg border"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg text-xl hover:scale-110 transition"
      >
        💬
      </a>
    </>
  )
}