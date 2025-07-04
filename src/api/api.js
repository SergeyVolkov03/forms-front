import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function fetchLoginData(data) {
  return axios({
    method: "post",
    url: "https://forms-api-69j3.onrender.com/auth/login",
    data: data,
  });
}

export function fetchRegistrationData(data) {
  return axios({
    method: "post",
    url: "https://forms-api-69j3.onrender.com/auth/registration",
    data: data,
  });
}

export function getUser(token) {
  const userId = jwtDecode(token).userId;
  return axios({
    method: "get",
    url: `https://forms-api-69j3.onrender.com/users/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUserByUserName(value) {
  return axios({
    method: "GET",
    url: "https://forms-api-69j3.onrender.com/users/search/username",
    params: {
      query: value,
    },
  });
}

export function getUserByEmail(value) {
  return axios({
    method: "GET",
    url: "https://forms-api-69j3.onrender.com/users/search/email",
    params: {
      query: value,
    },
  });
}

export function getUsers(token) {
  return axios({
    method: "get",
    url: "https://forms-api-69j3.onrender.com/users",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateUsers(token, ids, data) {
  return axios({
    method: "PATCH",
    url: "https://forms-api-69j3.onrender.com/users",
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
    url: "https://forms-api-69j3.onrender.com/users",
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
    url: "https://forms-api-69j3.onrender.com/templates",
    data: data,
  });
}

export function updateTemplate(id, data) {
  return axios({
    method: "PATCH",
    url: `https://forms-api-69j3.onrender.com/templates/${id}`,
    data,
  });
}

export function getTemplatesByUserId(id) {
  return axios({
    method: "GET",
    url: `https://forms-api-69j3.onrender.com/templates/user/${id}`,
  });
}

export function getTemplateByid(id) {
  return axios({
    method: "GET",
    url: `https://forms-api-69j3.onrender.com/templates/${id}`,
  });
}

export function getLatesTmaplates(query) {
  return axios({
    method: "GET",
    url: `https://forms-api-69j3.onrender.com/templates/latest?limit=${query}`,
  });
}

export function getPopularTmaplates(query) {
  return axios({
    method: "GET",
    url: `https://forms-api-69j3.onrender.com/templates/popular?limit=${query}`,
  });
}

export function deleteTemplatesFetch(ids) {
  return axios({
    method: "DELETE",
    url: "https://forms-api-69j3.onrender.com/templates",
    data: {
      ids: ids,
    },
  });
}

export function getTopicsFeth() {
  return axios({
    method: "GET",
    url: "https://forms-api-69j3.onrender.com/topics",
  });
}

export function getAllTags() {
  return axios({
    method: "GET",
    url: "https://forms-api-69j3.onrender.com/tags",
  });
}

export function getAllTagsByQuery(value) {
  return axios({
    method: "GET",
    url: "https://forms-api-69j3.onrender.com/tags/search",
    params: {
      query: value,
    },
  });
}

export function createTag(data) {
  return axios({
    method: "POST",
    url: "https://forms-api-69j3.onrender.com/tags",
    data,
  });
}

export function createQuestion(data) {
  return axios({
    method: "POST",
    url: "https://forms-api-69j3.onrender.com/questions",
    data,
  });
}

export function deleteQuestion(id) {
  return axios({
    method: "DELETE",
    url: `https://forms-api-69j3.onrender.com/questions/${id}`,
  });
}

export function updateQuestionsByOrder(data) {
  return axios({
    method: "PATCH",
    url: "https://forms-api-69j3.onrender.com/questions/update",
    data,
  });
}

export default function updateQuestion(id, data) {
  return axios({
    method: "PATCH",
    url: `https://forms-api-69j3.onrender.com/questions/${id}`,
    data,
  });
}

export function getQuestion(id) {
  return axios({
    method: "GET",
    url: `https://forms-api-69j3.onrender.com/questions/${id}`,
  });
}

export function createAnswerOption(data) {
  return axios({
    method: "POST",
    url: "https://forms-api-69j3.onrender.com/answer-option",
    data,
  });
}

export function updateAnswerOption(id, data) {
  return axios({
    method: "PATCH",
    url: `https://forms-api-69j3.onrender.com/answer-option/${id}`,
    data,
  });
}

export function deleteAnswerOtions(data) {
  return axios({
    method: "DELETE",
    url: `https://forms-api-69j3.onrender.com/answer-option`,
    data,
  });
}

export function createForm(data) {
  return axios({
    method: "POST",
    url: `https://forms-api-69j3.onrender.com/forms`,
    data,
  });
}

export function getForm(id) {
  return axios({
    method: "GET",
    url: `https://forms-api-69j3.onrender.com/forms/${id}`,
  });
}

export function upsertManyAnswers(data) {
  return axios({
    method: "POST",
    url: `https://forms-api-69j3.onrender.com/answers/many`,
    data,
  });
}

export function getFormsByUserId(id) {
  return axios({
    method: "GET",
    url: `https://forms-api-69j3.onrender.com/forms/user/${id}`,
  });
}

export function deleteManyForms(ids) {
  return axios({
    method: "DELETE",
    url: `https://forms-api-69j3.onrender.com/forms`,
    data: {
      ids: ids,
    },
  });
}

export function getFormsByTemplateId(id) {
  return axios({
    method: "GET",
    url: `https://forms-api-69j3.onrender.com/forms/template/${id}`,
  });
}
