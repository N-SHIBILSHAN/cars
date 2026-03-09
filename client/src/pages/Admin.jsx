const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    await axios.post("/api/vehicles", {
      ...form,
      price: Number(form.price),
      year: Number(form.year),
      hp: Number(form.hp),
    })

    alert("Vehicle added ✅")

    setForm({
      name: "",
      price: "",
      category: "",
      year: "",
      hp: "",
      fuel: "",
      image: "",
    })
  } catch (err) {
    console.error(err)
    alert("Failed to add vehicle ❌")
  }
}