const MINIO_ENDPOINT = process.env.VUE_APP_MINIO_ENDPOINT;

export const getMovieImagePath = (fileName) =>
  `${MINIO_ENDPOINT}/movies/images/${fileName}`;

export const getSouvenirImagePath = (fileName) =>
  `${MINIO_ENDPOINT}/souvenirs/images/${fileName}`;

export const getNewsImagePath = (fileName) =>
  `${MINIO_ENDPOINT}/news/images/${fileName}`;
