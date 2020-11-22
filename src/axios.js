import axios from "axios";
import { TOKEN_KEY } from "./utils/constants";

const token = localStorage.getItem(TOKEN_KEY);
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default instance;
