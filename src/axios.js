import axios from "axios";
import { TOKEN_KEY } from "./utils/constants";

const token = localStorage.getItem(TOKEN_KEY);
const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default instance;
