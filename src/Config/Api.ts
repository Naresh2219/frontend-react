import axios from 'axios';

export const API_URL = "http://localhost:4000";
export const DEPLOYED_URL = "https://zosh-bazzar-backend.onrender.com"
// export const API_URL= "https://zosh-bazzar-backend.onrender.com"
// change api

export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});