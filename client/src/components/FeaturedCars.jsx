import { useEffect, useState } from "react"
import axios from "axios"

export default function FeaturedCars() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/vehicles/featured"
        )
        setCars(res.data)
      } catch (err) {
        console.error("Failed to fetch featured cars", err)
      }
    }

    fetchFeatured()
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price || 0)
  }

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Collection
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold">{car.name}</h3>

              <p className="text-2xl font-bold mt-2">
                {formatPrice(car.price)}
              </p>

              <div className="flex justify-between text-sm text-gray-500 mt-3">
                <span>{car.year}</span>
                <span>{car.hp || 0} hp</span>
                <span>{car.fuel}</span>
              </div>

              <button className="mt-5 w-full border rounded-lg py-2 hover:bg-black hover:text-white transition">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}