import axios from "axios";

const BASE_PATH_API = "http://localhost/api/";
const PATH_AUTH = "http://localhost/";

const AUTH_HEADERS = (authToken) => {
  return {
    Authorization: `Bearer ${authToken}`,
  };
};

export const getMovies = () => axios.get(`${BASE_PATH_API}movies`);
export const getOneMovie = (id) => axios.get(`${BASE_PATH_API}movies/${id}`);
export const getLanguages = () => axios.get(`${BASE_PATH_API}languages`);
export const getFormats = () => axios.get(`${BASE_PATH_API}formats`);
export const getHalls = () => axios.get(`${BASE_PATH_API}halls`);
export const getGenres = () => axios.get(`${BASE_PATH_API}genres`);

export const createMovie = (data) => axios.post(`${BASE_PATH_API}movies`, data);
export const imageUpload = (id, data) =>
  axios.post(`${BASE_PATH_API}image/upload/movie/${id}`, data);

export const registration = (data) =>
  axios.post(`${BASE_PATH_API}register`, data);
export const login = (data) => axios.post(`${PATH_AUTH}login`, data);
export const getUserRoles = (authToken) =>
  axios.get(`${BASE_PATH_API}user`, { headers: AUTH_HEADERS(authToken) });
