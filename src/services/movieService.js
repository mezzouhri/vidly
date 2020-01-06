import http from "./httpService";
import config from "../config.json";

export function getMovies() {
  return http.get(config.apiMovieEndPoint);
}

export function getMovie(id) {
  return http.get(`${config.apiMovieEndPoint}/${id}`);
  //return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  //     const {data: movies} = await getMovies();
  //     let movieInDb = movies.find(m => m._id === movie._id) || {};
  //     movieInDb.title = movie.title;
  //     movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  //     movieInDb.numberInStock = movie.numberInStock;
  //     movieInDb.dailyRentalRate = movie.dailyRentalRate;
  //     if (!movieInDb._id) {
  //       movieInDb._id = Date.now().toString();
  //       movies.push(movieInDb);
  //     }
  //     return movieInDb;
  //   return await http.get(`${config.apiMovieEndPoint}/${id}`);
  //return movies.find(m => m._id === id);
}
