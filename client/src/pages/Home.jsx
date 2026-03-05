import Hero from "../components/Hero"
import FeaturedCars from "../components/FeaturedCars"

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Featured Section (DYNAMIC) */}
      <FeaturedCars />
    </div>
  )
}