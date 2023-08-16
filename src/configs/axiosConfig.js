import axios from "axios";
import { notification } from "antd";
import jwt_decode from "jwt-decode";
export const api = axios.create({
  // withCredentials: true,
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  if (error.code === "ERR_CANCELED") {
    notification.error({
      placement: "bottomRight",
      description: "API canceled!",
    });
    return Promise.resolve();
  }

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
    notification.error({
      placement: "bottomRight",
      description: error,
    });
  }

  return Promise.reject(error);
};

const jwtAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  // baseURL: "http://localhost:5000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const date = new Date();
    const decodedToken = jwt_decode(accessToken);
    if (decodedToken.exp < date.getTime() / 1000) {
      try {
        const res = await jwtAxios.post(`auth/refresh-token/`);
        const newAccessToken = res.data.token;
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        }
      } catch (error) {
        if (error.response.status === 403 || error.response.status === 401) {
          localStorage.removeItem("accessToken");
        }
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    return errorHandler(error);
  }
);

// api.interceptors.response.use(
//   (res) => res.data,
//   (error) => {
//     notification.error({
//       placement: "bottomRight",
//       description: error,
//     });
//     return Promise.reject(error);
//   }
// );
