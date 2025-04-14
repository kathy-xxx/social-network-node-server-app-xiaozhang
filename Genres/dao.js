import Database from "../Database/index.js";
export function findAllGenres() {
    return Database.genres;
}