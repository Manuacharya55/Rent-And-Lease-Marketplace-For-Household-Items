import axios from "axios";

export const patchRequest = async (URL, data, token) => {
  try {
    const response = await axios.post(URL, data, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
