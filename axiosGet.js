import axios from "axios";

export default async function axiosGetRequest(url) {
  const res = await axios
    .get(url, {
      auth: {
        username: "e0ddf5575e79fb6bb2b0963a5fd2c224",
        password: "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",
      },
    })
    .catch((err) => console.log(err));

  return res.data;
}
