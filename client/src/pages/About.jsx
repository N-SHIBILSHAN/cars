export default function About() {
  return (
    <section className="pt-28 pb-16 px-6 md:px-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          About Royal Cars
        </h1>

        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          Royal Cars is a trusted used car showroom dedicated to helping
          customers find high-quality pre-owned vehicles at the best value.
          Every car in our inventory is carefully inspected and handpicked to
          ensure reliability, performance, and complete peace of mind.
        </p>

        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          With years of experience in the automotive market, our mission is to
          provide transparent pricing, verified vehicle history, and a smooth,
          hassle-free buying experience from start to finish. Whether you're
          searching for a budget-friendly daily driver or a premium luxury car,
          Royal Cars makes your journey simple and confident.
        </p>

        {/* Mission / Vision Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-2xl shadow-md bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">🚀 Our Mission</h3>
            <p className="text-gray-600">
              To make used car buying simple, transparent, and trustworthy for
              every customer by offering thoroughly quality-checked pre-owned
              vehicles.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-md bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">👁️ Our Vision</h3>
            <p className="text-gray-600">
              To become India’s most trusted digital used car showroom known
              for honesty, quality vehicles, and customer satisfaction.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-md bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">🤝 Why Choose Us</h3>
            <p className="text-gray-600">
              Thoroughly inspected cars, verified documents, fair pricing,
              easy financing options, and dedicated customer support you can
              rely on.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}