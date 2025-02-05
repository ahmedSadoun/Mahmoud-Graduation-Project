import axios from "axios";
const dbURL = "https://windinfosys.com";

const example = async (commentContent) => {
  try {
    let data = JSON.stringify(commentContent);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://windinfosys.com/ords/saadoun_task/ifixit/comments",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      // console.error("Error response data:", error.response.data);
      // console.error("Error status:", error.response.status);
      // console.error("Error headers:", error.response.headers);
      return error.response;
    } else if (error.request) {
      // Request was made but no response
      console.error("No response received:", error.request);
      return error.request;
    } else {
      // Something else caused the error
      console.error("Error:", error.message);
      return error.message;
    }
  }
};
function print(input) {
  console.log("sssssss, ", input);
}

export { print, example };
