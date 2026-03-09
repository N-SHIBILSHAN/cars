import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { formatPrice } from "../utils/formatPrice"

export default function VehicleDetails() {

  const { id } = useParams()
  const [car, setCar] = useState(null)

  useEffect(() => {

    const fetchCar = async () => {
      try {

        const res = await axios.get(
          `https://cars-ex3y.onrender.com/api/vehicles/${id}`
        )

        setCar(res.data)

      } catch (err) {
        console.error("Failed to fetch vehicle", err)
      }
    }

    fetchCar()

  }, [id])

  if (!car) {
    return (
      <p className="pt-32 text-center text-lg font-semibold">
        Loading...
      </p>
    )
  }

  return (
    <section className="pt-28 pb-16 px-6 max-w-6xl mx-auto">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={car.image}
          alt={car.name}
          className="w-full rounded-xl"
        />

        <div>

          <h1 className="text-3xl font-bold mb-4">
            {car.name}
          </h1>

          <p className="text-2xl font-bold mb-6">
            {formatPrice(car.price)}
          </p>

          <div className="space-y-2 text-gray-600">

            <p><b>Year:</b> {car.year}</p>

            <p><b>Power:</b> {car.hp || 0} hp</p>

            <p><b>Fuel:</b> {car.fuel}</p>

            <p><b>Category:</b> {car.category}</p>

          </div>

        </div>

      </div>

    </section>
  )
}
