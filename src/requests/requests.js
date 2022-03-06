import qs from "qs";
const axios = require("axios");
var Buffer = require("buffer/").Buffer;

const fetchData = async (url) => {
  // clientId & clientSecret should normally be not exposed here
  const clientId = "37ca67209d5d459091f55a8fcc0f34cc";
  const clientSecret = "77fceae630c547829395eda42975f6e3";

  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + new Buffer(clientId + ":" + clientSecret).toString("base64"),
    },
  };
  const data = {
    grant_type: "client_credentials",
  };

  const authorization = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify(data),
    headers
  );

  const token = authorization.data.access_token;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default fetchData;
