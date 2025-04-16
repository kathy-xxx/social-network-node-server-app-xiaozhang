import model from "./model.js";
export function findAllGenres() {
    return model.find();
}