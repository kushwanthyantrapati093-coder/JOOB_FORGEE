// src/api/jobfinder.js
import axios from "axios";
const API = "http://localhost:8000/jobs";

export const getJobs = async (query, location) => {
  return axios.get(API, { params: { query, location } });
};
