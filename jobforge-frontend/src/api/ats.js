import axios from "axios";
const API = "http://localhost:8000/ats";

export const getATSScore = async (data) => {
    return axios.post(API, data);
};
