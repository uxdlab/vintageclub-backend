import "dotenv/config";
import axios from "axios";

export default async function axiosGetRequest(url) {
  const res = await axios
    .get(url, {
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
    })
    .catch((err) => console.log(err));

  return res.data;
}
