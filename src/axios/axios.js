import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export function sendRequest({method, url, data}) {
  instance.request({
    method: method || 'post',
    url,
    data,
  });
}
