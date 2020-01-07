import http from "./httpService";
import { apiUrl } from "../config.json";

export function getGenres() {
  //const promise = await http.get(config.apiGenreEndpoint);
  return http.get(`${apiUrl}/genres`);
}
