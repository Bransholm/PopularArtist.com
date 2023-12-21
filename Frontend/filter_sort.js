import { getArtists } from "./app.js";

//The filter and sort variables
let sortArtistsValue = (a, b) => a.name.localeCompare(b.name);
let filterFavoriteValue = "false";

//Setting filter value
function setFilterValue(event) {
  const value = event.target.value;
  if (value === "false") {
    filterFavoriteValue = "false";
    console.log(filterFavoriteValue);
    getArtists();
  } else if (value === "true") {
    filterFavoriteValue = "true";
    console.log(filterFavoriteValue);
    getArtists();
  }
}

//Setting sort value
function setSortValue(event) {
  const value = event.target.value;
  if (value === "a") {
    sortArtistsValue = (a, b) => a.name.localeCompare(b.name);
    console.log(sortArtistsValue);
    getArtists();
  } else if (value === "z") {
    sortArtistsValue = (a, b) => b.name.localeCompare(a.name);
    console.log(sortArtistsValue);
    getArtists();
  }
}

export { sortArtistsValue, filterFavoriteValue, setFilterValue, setSortValue };
