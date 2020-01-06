import http from "./httpService";
import config from "../config.json";

export async function getGenres() {
  //const promise = await http.get(config.apiGenreEndpoint);
  return await http.get(config.apiGenreEndpoint);
}
