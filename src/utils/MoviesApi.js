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
        } else
          return Promise.reject(
            `Произошла ошибка: ${res.status}:${res.statusText}`
          );
      })
      .catch((err) => console.log(`Request failed ${err.status}`));
  }
  getMovies() {
    return this._makeRequest(
      fetch(`${this._url}/beatfilm-movies`, {
        method: "GET",
      })
    );
  }
}
const MoviesApi = new Api("https://api.nomoreparties.co");

export default MoviesApi;
