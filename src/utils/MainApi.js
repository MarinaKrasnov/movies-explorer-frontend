class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _makeRequest(promise) {
    return promise
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return res;
      })
      .catch((err) => console.log(`Request failed ${err.status}`));
  }

  getSavedMovies(jwt) {
    return this._makeRequest(
      fetch(`${this._url}/movies`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
    );
  }

  getProfileInfo(jwt) {
    return this._makeRequest(
      fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
    );
  }

  deleteMovie(id, jwt) {
    const promise = fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    return this._makeRequest(promise);
  }

  editProfileInfo({ name, email }, jwt) {
    return this._makeRequest(
      fetch(`${this._url}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          name,
          email,
        }),
      })
    );
  }
  changeSaveStatus(id, isSaved, jwt) {
    return this._makeRequest(
      fetch(`${this._url}/movies/${id}`, {
        method: isSaved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
    );
  }
  saveMovie(item, jwt) {
    const promise = fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        ...item,
      }),
    });
    return this._makeRequest(promise);
  }
}
const MainApi = new Api("https://api.catalog.nomoredomains.sbs");

export default MainApi;
