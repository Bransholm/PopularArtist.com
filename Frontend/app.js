"use strict";

const endpoint = "http://localhost:4100";
const sortArtistsValue = (a, b) => a.name.localeCompare(b.name);
const filterFavoriteValue = false;

window.addEventListener("load", start);

function start() {
  getArtists();
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
  if (filterFavoriteValue === false) {
  filterFavorites = artists.filter((artist) => artist.favorite === false || artist.favorite === true);    
  } else if (filterFavoriteValue === true) {
    filterFavorites = artists.filter((artist) => artist.favorite === true);
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
      document
        .querySelector("#display-artists")
        .insertAdjacentHTML("beforeend", html);

      document
        .querySelector(
          "#display-artists article:last-child .button-update-artist"
        )
        .addEventListener("click", () => updateArtist(artist));
      document
        .querySelector(
          "#display-artists article:last-child .button-delete-artist"
        )
        .addEventListener("click", () => deleteArtist(artist.id));
    }
}

//Create artist
function createArtist(event) {
    event.preventDefault();
    console.log("Create user registrated");
}

//Update artist - Comming soon
function updateArtist() {}

//Delete artist
async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "delete",
  });
  if (response.ok) {
    getArtists();
  }
}
