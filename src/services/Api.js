import axios from "axios";

const host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:4000/api/";
export default axios.create({
  baseURL: host,
  headers: {
    "Content-type": "application/json",
  },
});
