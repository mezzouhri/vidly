import http from "./httpService";
import config from "../config.json";

export async function getMovies() {
  return await http.get(config.apiMovieEndPoint);
}
