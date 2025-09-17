import axios from "axios";

const { VITE_BACKEND_URL: BACKEND_URL } = import.meta.env;
if (BACKEND_URL == undefined) {
  throw new Error("BACKEND_URL env var not set");
}

export const healthCheck = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/health`);
    return response;
  } catch (e) {
    console.error("health check failed", e);
    throw e;
  }
};
