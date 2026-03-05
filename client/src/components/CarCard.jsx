import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { formatPrice } from "../utils/formatPrice"

export default function CarCard({ car }) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    if (!car?._id) return
    navigate(`/vehicle/${car._id}`)
  }

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition group"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <motion.img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg">{car.name}</h3>

        <p className="text-2xl font-bold mt-2">
          {formatPrice(car.price)}
        </p>

        <div className="flex justify-between text-sm text-gray-500 mt-3">
          <span>{car.year}</span>
          <span>{car.hp || 0} hp</span>
          <span className="capitalize">{car.fuel}</span>
        </div>

        <button
          onClick={handleViewDetails}
          className="mt-4 w-full border rounded-lg py-2 font-medium hover:bg-black hover:text-white transition"
        >
          View Details →
        </button>
      </div>
    </motion.div>
  )
}