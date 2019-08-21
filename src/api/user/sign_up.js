import { sendRequest } from "../../axios/axios";

export function signUp(data) {
  return sendRequest({
    method: 'post',
    url: '/sign_up',
    data
  })
}