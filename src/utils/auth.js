const API_URL = "https://api.catalog.nomoredomains.sbs";

export const register = (name, email, password) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else {
      throw new Error("Unsuccessful registration");
    }
  });
};

export const login = (email, password) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject(
        `Произошла ошибка: ${response.status}:${response.statusText}`
      );
    }
  });
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(
      `Произошла ошибка: ${response.status}:${response.statusText}`
    );
  }
};
