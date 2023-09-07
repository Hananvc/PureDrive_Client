import axios from "axios";

// Create and configure an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace with your API base URL
  timeout: 10000, // Set the timeout for requests (in milliseconds)
});

// Add a request interceptor to set the Authorization header before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access"); // Assuming you store the access token in localStorage
    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh when the access token is expired
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refresh = localStorage.getItem("refresh"); // Assuming you store the refresh token in localStorage

    if (
      error.response.status === 401 && // Unauthorized error
      !originalRequest._retry && // Avoid infinite loops
      refresh
    ) {
      originalRequest._retry = true;
      try {
        // Make a request to refresh the access token using the refresh token
        const refreshResponse = await axios.post(
          "http://127.0.0.1:8000/userapp/token/refresh/",
          {
            refresh: refresh,
          }
        );

        if (refreshResponse.status === 200) {
          // If the refresh was successful, update the access token in localStorage
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem("access", newAccessToken);

          // Retry the original request with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Handle errors related to token refresh, e.g., redirect to login
        console.error("Error refreshing access token:", refreshError);
        // Add your logic here to handle the refresh token failure, such as redirecting to the login page
        // or showing a notification to the user.
      }
    }

    // Return any error if the refresh token is not available or refresh fails
    return Promise.reject(error);
  }
);

export default axiosInstance;