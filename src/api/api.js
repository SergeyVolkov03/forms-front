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

export function getUserByUserName(value) {
  return axios({
    method: "GET",
    url: "http://localhost:5000/users/search/username",
    params: {
      query: value,
    },
  });
}

export function getUserByEmail(value) {
  return axios({
    method: "GET",
    url: "http://localhost:5000/users/search/email",
    params: {
      query: value,
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

export function updateTemplate(id, data) {
  return axios({
    method: "PATCH",
    url: `http://localhost:5000/templates/${id}`,
    data,
  });
}

export function getTemplatesByUserId(id) {
  return axios({
    method: "GET",
    url: `http://localhost:5000/templates/user/${id}`,
  });
}

export function getTemplateByid(id) {
  return axios({
    method: "GET",
    url: `http://localhost:5000/templates/${id}`,
  });
}

export function deleteTemplatesFetch(ids) {
  return axios({
    method: "DELETE",
    url: "http://localhost:5000/templates",
    data: {
      ids: ids,
    },
  });
}

export function getTopicsFeth() {
  return axios({
    method: "GET",
    url: "http://localhost:5000/topics",
  });
}

export function getAllTags() {
  return axios({
    method: "GET",
    url: "http://localhost:5000/tags",
  });
}

export function getAllTagsByQuery(value) {
  return axios({
    method: "GET",
    url: "http://localhost:5000/tags/search",
    params: {
      query: value,
    },
  });
}

export function createTag(data) {
  return axios({
    method: "POST",
    url: "http://localhost:5000/tags",
    data,
  });
}

export function createQuestion(data) {
  return axios({
    method: "POST",
    url: "http://localhost:5000/questions",
    data,
  });
}

export function deleteQuestion(id) {
  return axios({
    method: "DELETE",
    url: `http://localhost:5000/questions/${id}`,
  });
}

export function updateQuestionsByOrder(data) {
  return axios({
    method: "PATCH",
    url: "http://localhost:5000/questions/update",
    data,
  });
}

export default function updateQuestion(id, data) {
  return axios({
    method: "PATCH",
    url: `http://localhost:5000/questions/${id}`,
    data,
  });
}
