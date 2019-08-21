import { sendRequest } from "../../axios/axios";

export function deleteStudent(data) {
  return sendRequest({
    method: "post",
    url: "/delete_student",
    data
  });
}

export function getStudentList() {
  return sendRequest({
    method: "get",
    url: "/student_list"
  });
}

export function uploadAvatar(data) {
  return sendRequest({
    method: "post",
    url: "/upload_avatar",
    data
  });
}
