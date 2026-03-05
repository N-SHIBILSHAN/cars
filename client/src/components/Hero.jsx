import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[520px] md:h-[600px] flex items-center justify-center text-white overflow-hidden">
      
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1542362567-b07e54358753"
        alt="Luxury car"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-center max-w-3xl px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Drive Your Dreams
        </h1>

        <p className="text-base md:text-lg text-gray-200 mb-8">
          Discover the finest collection of luxury and performance vehicles.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/inventory")}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-gray-100 transition"
          >
            Browse Inventory
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            Schedule Visit
          </button>
        </div>
      </motion.div>
    </section>
  )
}