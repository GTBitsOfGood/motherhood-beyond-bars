import axios from "axios";

const mbbAxios = axios.create({
  baseURL: "https://us-central1-motherhood-beyond-bars.cloudfunctions.net/",
  timeoutErrorMessage: "Request timed out",
  timeout: 10000,
});

export default mbbAxios;
