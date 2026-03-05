import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Admin from "./pages/Admin"
import Home from "./pages/Home"
import Inventory from "./pages/Inventory"
import About from "./pages/About"
import Contact from "./pages/Contact"
import VehicleDetails from "./pages/VehicleDetails"

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* prevents navbar overlap */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
        </Routes>
      </main>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg text-xl"
      >
        💬
      </a>
    </div>
  )
}