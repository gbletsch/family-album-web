import axios from "axios";
import { TOKEN_KEY } from "./utils/constants";

const token = localStorage.getItem(TOKEN_KEY);
const instance = axios.create({
  baseURL: "https://family-album-server.herokuapp.com/",
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default instance;
