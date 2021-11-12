import axios from 'axios';

// api config
import apiconfig from '../config';

const request = axios.create({
  timeout: apiconfig.timeOut,
  baseURL: apiconfig.movieDB.baseAPI,
  headers: { 'Content-Type': 'application/json' }
});

request.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    api_key: apiconfig.movieDB.apiKey,
  };
  return config;
});

class MovieDBService {
  getMovies = (apiURL, page) => {
    return new Promise((resolve, reject) => {
      request
        .get(apiURL, {
          params: { page }
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getAllMovies = (page = 1) => {
    return this.getMovies('/discover/movie', page);
  }

  getTopRatedMovies = (page = 1) => {
    return this.getMovies('/movie/top_rated', page);
  }

  getUpComingMovies = (page = 1) => {
    return this.getMovies('/movie/upcoming', page);
  }

  getMovieById = (movieId) => {
    return new Promise((resolve, reject) => {
      request
        .get(`/movie/${movieId}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getAuthToken = () => {
    return new Promise((resolve, reject) => {
      request
        .get('/authentication/token/new')
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  createSession = (token) => {
    return new Promise((resolve, reject) => {
      request
        .post('/authentication/session/new', {
          request_token: token
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getAccountDetails = (sessionId) => {
    return new Promise((resolve, reject) => {
      request
        .get('/account', {
          params: { session_id: sessionId }
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getFavoriteMovies = ({ accountId, sessionId, page = 1 }) => {
    return new Promise((resolve, reject) => {
      request
        .get(`/account/${accountId}/favorite/movies`, {
          params: {
            page,
            session_id: sessionId
          }
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  markAsFavorite = ({ accountId, sessionId, mediaId, favorite }) => {
    return new Promise((resolve, reject) => {
      request
        .post(`/account/${accountId}/favorite`, {
          favorite,
          media_id: mediaId,
          media_type: 'movie',
        }, {
          params: { session_id: sessionId }
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  searchMovies = (query, page = 1) => {
    return new Promise((resolve, reject) => {
      request
        .get('/search/movie', {
          params: { page, query }
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

const instance = new MovieDBService();

export default instance;
