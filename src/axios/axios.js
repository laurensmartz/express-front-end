import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/"
});

instance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export function sendRequest({ method, url, data }) {
  return instance.request({
    method: method || "post",
    url,
    data
  });
}
