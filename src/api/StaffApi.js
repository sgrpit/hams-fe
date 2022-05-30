import axios from "axios";

//axios.defaults.baseURL = "http://localhost:5001/api"

export default axios.create({
    baseURL: "https://localhost:47673/api"
});