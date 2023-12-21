"use strict";

const endpoint = "http://localhost:4100";
let sortArtistsValue = (a, b) => a.name.localeCompare(b.name);
let filterFavoriteValue = "false";
let artistToUpdate;

window.addEventListener("load", start);

function start() {
  getArtists();
  document.querySelector("#filter-options").addEventListener("change", setFilterValue);
  document.querySelector("#sort-options").addEventListener("change", setSortValue);
  document.querySelector("#update-form").addEventListener("submit", updateArtist);
  document.querySelector("#create-form").addEventListener("submit", createArtist);
}

async function getArtists() {
  const artists = await fetchArtists();
  showSelectedArtists(artists);
}

async function fetchArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

function showSelectedArtists(artists) {
  document.querySelector("#display-artists").innerHTML = "";
  artists.sort(sortArtistsValue);
  let filterFavorites;
  if (filterFavoriteValue === "false") {
  filterFavorites = artists.filter((artist) => artist.favorite === "false" || artist.favorite === "true");    
  } else if (filterFavoriteValue === "true") {
    filterFavorites = artists.filter((artist) => artist.favorite === "true");
  }
    
    for (const artist of filterFavorites) {
      const html =
        /*html*/
        `
            <article class="grab-artists" align="center">
            <h3>${artist.name}</h3>
            <img src="./images/${artist.image}" alt ="${artist.name}">
            <p>Birthdate: ${artist.birthdate}</p>
            <p>Active since: ${artist.activeSince}</p>
            <p>Genres: ${artist.genres}</p>
            <p>Labels: ${artist.labels}</p>
            <p>Website: <a href="${artist.website}" target="_blank">Visit website</a> </p>
            <p>About: ${artist.shortDescription}</p>
            <p class="artist-buttons">
                <button class="button-update-artist">Update</button>
                <button class="button-delete-artist">Delete</button>
            </p>
            </article>
            `;
      document.querySelector("#display-artists").insertAdjacentHTML("beforeend", html);

      document.querySelector("#display-artists article:last-child .button-update-artist").addEventListener("click", () => getArtistToUpdate(artist));
      document.querySelector("#display-artists article:last-child .button-delete-artist").addEventListener("click", () => deleteArtist(artist.id));
    }
}

//Setteing filter value
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

//Setteing sort value
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

//Create artist
async function createArtist(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const birthdate = event.target.birthdate.value;
  const activeSince = event.target.activeSince.value;
  const genres = event.target.genres.value;
  const labels = event.target.labels.value;
  const website = event.target.website.value;
  const image = event.target.image.value;
  const shortDescription = event.target.shortDescription.value;
  const favorite = event.target.favorite.value;

  // create a new artist
  const newArtist = { name, birthdate, activeSince, genres, labels, website, image, shortDescription, favorite };
  const artistAsJson = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistAsJson,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    getArtists();
    moveBrowserToTheTopOfThePage();
  }
}

//Select and show the artist to update
function getArtistToUpdate(artist) {
  artistToUpdate = artist;
  const form = document.querySelector("#update-form");
  form.name.value = artist.name;
  form.birthdate.value = artist.birthdate;
  form.activeSince.value = artist.activeSince;
  form.genres.value = artist.genres;
  form.labels.value = artist.labels;
  form.website.value = artist.website;
  form.image.value = artist.image;
  form.shortDescription.value = artist.shortDescription;
  form.favorite.value = artist.favorite;
  form.scrollIntoView({ behavior: "auto" });
}

//Update artist - Comming soon
function updateArtist() { };


//Delete artist
async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "delete",
  });
  if (response.ok) {
    getArtists();
    moveBrowserToTheTopOfThePage();
  }
}

function moveBrowserToTheTopOfThePage() {
  window.scrollTo({ top: 0, behavior: "auto" });
}
