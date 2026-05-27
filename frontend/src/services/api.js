import axios from "axios"

const api = axios.create({
  baseURL: "https://shield-1-fesh.onrender.com"
})

export default api