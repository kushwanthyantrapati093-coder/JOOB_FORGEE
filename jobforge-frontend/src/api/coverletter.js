import axios from "axios";

const API_URL = "http://127.0.0.1:8000/cover-letter/";

export const getCoverLetter = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
