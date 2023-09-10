"use strict"

const endpoint = "http://localhost:4000";

window.addEventListener("load", start);

function start() {
    getArtists();
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
    for (const artist of artists) {
        
        const html = `
            <article class="grab-artists" align="center">
            <h3>${artist.name}</h3>
            <img src="${artist.image}" alt ="${artist.name}">
            <p>Birthdate: ${artist.birtgdate}</p>
            <p>Active since: ${artist.activeSince}</p>
            <p>Genres: ${artist.genres}</p>
            <p>Labels: ${artist.labels}</p>
            <p>Website: ${artist.website}</p>
            <p>About: ${artist.shortDescription}</p>
            </article>
            `;
        
        document.querySelector("#display-artists").insertAdjacentHTML("beforeend", html);
    }
}