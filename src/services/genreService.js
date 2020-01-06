import http from "./httpService";
import config from "../config.json";

export function getGenres() {
  //const promise = await http.get(config.apiGenreEndpoint);
  return http.get(config.apiGenreEndpoint);
}
