import { useEffect, useState } from "react"
import axios from "axios"
import CarCard from "../components/CarCard"

export default function Inventory() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])

  const [category, setCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("/api/vehicles")
        setCars(res.data)
        setFilteredCars(res.data)
      } catch (err) {
        console.error("Failed to fetch cars", err)
      }
    }

    fetchCars()
  }, [])

  // Filtering logic
  useEffect(() => {
    let temp = [...cars]

    // Category filter
    if (category !== "All") {
      temp = temp.filter(
        (car) => car.category?.toLowerCase() === category.toLowerCase()
      )
    }

    // Price filter
    if (priceRange !== "All") {
      if (priceRange === "Under 75k") {
        temp = temp.filter((car) => car.price < 7500000)
      }

      if (priceRange === "75k-100k") {
        temp = temp.filter(
          (car) => car.price >= 7500000 && car.price <= 10000000
        )
      }

      if (priceRange === "Over 100k") {
        temp = temp.filter((car) => car.price > 10000000)
      }
    }

    setFilteredCars(temp)
  }, [category, priceRange, cars])

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>

      {/* Filters */}
      <div className="bg-gray-100 p-6 rounded-2xl mb-8">

        {/* Category */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Category</h3>

          <div className="flex flex-wrap gap-3">
            {["All", "Sports", "Sedan", "SUV", "Electric"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg border ${
                  category === cat
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>

          <div className="flex flex-wrap gap-3">
            {["All", "Under 75k", "75k-100k", "Over 100k"].map((price) => (
              <button
                key={price}
                onClick={() => setPriceRange(price)}
                className={`px-4 py-2 rounded-lg border ${
                  priceRange === price
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Results Count */}
      <p className="text-gray-500 mb-6">
        Showing {filteredCars.length} vehicles
      </p>

      {/* Cars Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

    </section>
  )
}
