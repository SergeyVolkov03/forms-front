import axios from "axios";

export function fetchLoginData(data) {
  return axios({
    method: "post",
    url: "http://localhost:5000/auth/login",
    data: data,
  });
}

export function fetchRegistrationData(data) {
  axios({
    method: "post",
    url: "http://localhost:5000/auth/registration",
    data: data,
  });
}
