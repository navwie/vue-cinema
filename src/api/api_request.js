import axios from "axios";

const BASE_PATH_API = "http://localhost/api/";
const PATH_AUTH = "http://localhost/api/auth/";

// const AUTH_HEADERS = (authToken) => {
//   return {
//     Authorization: `Bearer ${authToken}`,
//   };
// };

export const getMovies = () => axios.get(`${BASE_PATH_API}movies`);
export const getCinemaAddresses = () => axios.get(`${BASE_PATH_API}cinemas`);
export const getLanguages = () => axios.get(`${BASE_PATH_API}languages`);
export const getFormats = () => axios.get(`${BASE_PATH_API}formats`);
export const getHalls = () => axios.get(`${BASE_PATH_API}halls`);
export const getGenres = () => axios.get(`${BASE_PATH_API}genres`);
export const getNews = () => axios.get(`${BASE_PATH_API}news`);
export const getSouvenirs = () => axios.get(`${BASE_PATH_API}souvenirs`);
export const getProducts = () => axios.get(`${BASE_PATH_API}products`);
// export const getUserRoles = (authToken) =>
//   axios.get(`${BASE_PATH_API}users`, { headers: AUTH_HEADERS(authToken) });

export const getUsers = (id) => axios.get(`${BASE_PATH_API}users/${id}`);
export const getOneSession = (id) =>
  axios.get(`${BASE_PATH_API}sessions/${id}`);
export const getOneMovie = (id) => axios.get(`${BASE_PATH_API}movies/${id}`);
export const getOneHall = (id) => axios.get(`${BASE_PATH_API}halls/${id}`);
export const createMovie = (data) => axios.post(`${BASE_PATH_API}movies`, data);
export const createSouvenir = (data) =>
  axios.post(`${BASE_PATH_API}souvenirs`, data);
export const createProduct = (data) =>
  axios.post(`${BASE_PATH_API}products`, data);
export const createNews = (data) => axios.post(`${BASE_PATH_API}news`, data);
export const createComment = (data) =>
  axios.post(`${BASE_PATH_API}comments`, data);
export const addCommentToMovie = (data) =>
  axios.post(`${BASE_PATH_API}movie-comments`, data);
export const updateMovie = (id, data) =>
  axios.put(`${BASE_PATH_API}movies/${id}`, data);
export const updateProfile = (id, data) =>
  axios.put(`${BASE_PATH_API}users/${id}`, data);

export const imageUpload = (id, data) =>
  axios.post(`${BASE_PATH_API}image/upload/movie/${id}`, data);
export const imageSouvenirUpload = (id, data) =>
  axios.post(`${BASE_PATH_API}image/upload/souvenir/${id}`, data);
export const imageNewsUpload = (id, data) =>
  axios.post(`${BASE_PATH_API}image/upload/news/${id}`, data);

export const registration = (data) => axios.post(`${PATH_AUTH}register`, data);
export const login = (data) => axios.post(`${PATH_AUTH}login`, data);
export const logout = () => axios.post(`${PATH_AUTH}logout`);

export const getQuizes = () => axios.get(`${BASE_PATH_API}quiz/quizes`);
export const createQuiz = (data) =>
  axios.post(`${BASE_PATH_API}quiz/quizes`, data);
export const createQuestion = (data) =>
  axios.post(`${BASE_PATH_API}quiz/questions`, data);
export const createSession = (data) =>
  axios.post(`${BASE_PATH_API}sessions`, data);
export const movieSession = (data) =>
  axios.post(`${BASE_PATH_API}movie-sessions`, data);
export const updateQuizesQuestion = (id, data) =>
  axios.put(`${BASE_PATH_API}quiz/questions/${id}`, data);

export const createOrder = (data) => axios.post(`${BASE_PATH_API}orders`, data);
export const getMyOrders = (id) =>
  axios.get(`${BASE_PATH_API}orders/user/${id}`);

export const getShopId = (id) => axios.get(`${BASE_PATH_API}shops/${id}`);
export const getCafeId = (id) => axios.get(`${BASE_PATH_API}cafes/${id}`);

export const getIntent = (id) =>
  axios.get(`${BASE_PATH_API}stripe/intent/${id}`);

export const purchase = (data) =>
  axios.post(`${BASE_PATH_API}stripe/purchase/`, data);

export const getPopularMovies = (params) =>
  axios.get(`${BASE_PATH_API}analytics/most-popular-movies`, { params });

export const createProductCafes = (params) =>
  axios.post(`${BASE_PATH_API}cafe-products`, params);

export const createSouvenirShop = (params) =>
  axios.post(`${BASE_PATH_API}shop-souvenirs`, params);

export const getAddress = (id) => axios.get(`${BASE_PATH_API}addresses/${id}`);

export const getSaleStatistic = (id, params) =>
  axios.get(`${BASE_PATH_API}statistic/sale/${id}`, { params });
