class Api {
  constructor(url, headers) {
    this._url = url
    this._headers = headers
  }

  _makeRequest(promise) {
    return promise.then(res => {
      if (res.ok) {
        return res.json()
      }
    }).catch(err => console.log(`Request failed ${err.status}`))
  }

  getMovies(jwt) {
    return this._makeRequest(
      fetch(`${this._url}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        }
      }
      ))
  }

  getSavedMovies(jwt) {
    return this._makeRequest(
      fetch(`${this._url}/saved-movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        }
      }
      ))
  }

  getProfileInfo(jwt) {
    return this._makeRequest(
      fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        }
      }
      ))
  }

  deleteMovie(id, jwt) {
    const promise = fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    return this._makeRequest(promise)
  }
  
  editProfileInfo({ name, email }, jwt) {
    return this._makeRequest(
      fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          name,
          email
        })
      })
    )
  }
}
const api = new Api('https://api.catalog.nomoredomains.sbs')

export default api
