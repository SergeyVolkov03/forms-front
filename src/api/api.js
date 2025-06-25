import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function fetchLoginData(data) {
  return axios({
    method: "post",
    url: "http://localhost:5000/auth/login",
    data: data,
  });
}

export function fetchRegistrationData(data) {
  return axios({
    method: "post",
    url: "http://localhost:5000/auth/registration",
    data: data,
  });
}

export function getUser(token) {
  const userId = jwtDecode(token).userId;
  return axios({
    method: "get",
    url: `http://localhost:5000/users/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUsers(token) {
  return axios({
    method: "get",
    url: "http://localhost:5000/users",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateUsers(token, ids, data) {
  return axios({
    method: "PATCH",
    url: "http://localhost:5000/users",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ids: ids,
      ...data,
    },
  });
}

export function deleteUsersFetch(token, ids) {
  return axios({
    method: "DELETE",
    url: "http://localhost:5000/users",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ids: ids,
    },
  });
}

export function createTemplate(data) {
  return axios({
    method: "POST",
    url: "http://localhost:5000/templates",
    data: data,
  });
}

export function getTemplatesByUserId(id) {
  return axios({
    method: "GET",
    url: `http://localhost:5000/templates/user/${id}`,
  });
}
