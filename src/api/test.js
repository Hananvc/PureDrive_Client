import axios from "axios";

const axiosInstanceWithoutAuth = axios.create({
    baseURL: "https://puredrive.onrender.com", // Replace with your API base URL
    timeout: 10000,
  });


export default axiosInstanceWithoutAuth;