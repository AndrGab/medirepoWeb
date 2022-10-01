import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:4000/api/",
  baseURL: "https://elderly-joyous-pangolin.gigalixirapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
