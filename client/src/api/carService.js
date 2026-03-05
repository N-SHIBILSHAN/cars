import axios from "axios"

const API = "http://localhost:5000/api/cars"

export const getCars = async () => {
  const res = await axios.get(API)
  return res.data
}

export const addCar = async (carData) => {
  const res = await axios.post(API, carData)
  return res.data
}

export const deleteCar = async (id) => {
  await axios.delete(`${API}/${id}`)
}