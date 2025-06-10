import axios from "axios";

export const patchRequest = async (URL,id, data, token) => {
  try {
    const response = await axios.patch(URL+id, data, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
