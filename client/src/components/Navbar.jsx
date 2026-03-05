import { useState } from "react"
import { Menu, X, Car } from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const navItem =
    "text-gray-600 hover:text-black font-medium transition"

  const activeItem = "text-black font-semibold"

  const handleTestDrive = () => {
    setOpen(false)
    navigate("/contact")
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-black p-2 rounded-lg">
            <Car className="text-white w-5 h-5" />
          </div>
          <span className="font-semibold text-lg">Royal cars</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            Inventory
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={handleTestDrive}
            className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Schedule Test Drive
          </button>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col gap-4 p-6">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/inventory" onClick={() => setOpen(false)}>Inventory</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

            <button
              onClick={handleTestDrive}
              className="bg-black text-white py-2 rounded-lg mt-2"
            >
              Schedule Test Drive
            </button>
          </div>
        </div>
      )}
    </header>
  )
}