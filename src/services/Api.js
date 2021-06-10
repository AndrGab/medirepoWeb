import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-type": "application/json"
    }
});