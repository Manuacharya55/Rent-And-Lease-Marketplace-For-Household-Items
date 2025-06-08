import axios from "axios";

export const deleteRequest = async (URL, token) => {
  try {
    const response = await axios.post(URL, {
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
