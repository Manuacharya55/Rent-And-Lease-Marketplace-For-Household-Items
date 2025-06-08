import axios from "axios";

export const postRequest = async (URL, data, token="") => {
  try {
    const response = await axios.post(URL, data, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
