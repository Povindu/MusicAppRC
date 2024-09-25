import axios from "axios";

const api = axios.create({
  baseURL: "https://itunes.apple.com/",
});

export const searchSongs = (term: string) => {
  console.log(term);
  return api.get(`/search?term=${term}&limit=25`);
};
