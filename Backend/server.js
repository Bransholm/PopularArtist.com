import express from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// check
// const artists = [
//   { id: 1, task: "Buy groceries", completed: false },
//   { id: 2, task: "Finish homework", completed: false },
//   { id: 3, task: "Call mom", completed: false },
//   { id: 4, task: "Go for a run", completed: false },
//   { id: 5, task: "Read a book", completed: false },
//   { id: 6, task: "Write a blog post", completed: false },
// ];

//console.log(artists);

//GET artists
app.get("/artists", async (request, response) => {
  const data = await fs.readFile("data/artists.json");
  const artists = JSON.parse(data);
  response.json(artists);
});

//GET artist object by id
app.get("/artists/:id", async (request, response) => {
  const data = await fs.readFile("data/artists.json");
  const artists = JSON.parse(data);
  console.log(request.params);
  const id = Number(request.params.id);
  const findArtists = artists.find((artist) => artist.id === id);
  console.log(findArtists);
  response.json(findArtists);
});

//Post artists
app.post("/artists", async (request, response) => {
  console.log("Request body:", request.body);

  const newArtist = {
    id: new Date().getTime(),
    name: request.body.name,
    birthdate: request.body.birthdate,
    activeSince: request.body.activeSince,
    genres: request.body.genres,
    labels: request.body.labels,
    website: request.body.website,
    image: request.body.image,
    shortDescription: request.body.shortDescription,
  };

  const data = await fs.readFile("data/artists.json");
  const artists = JSON.parse(data);
  artists.push(newArtist);
  console.log(artists);
  fs.writeFile("data/artists.json", JSON.stringify(artists));
  response.json(artists);
});

//PUT artists
app.put("/artists/:id", async (request, response) => {
  console.log(request.params.id);
  const id = Number(request.params.id);
  console.log(id);

  const data = await fs.readFile("data/artists.json");
  const artists = await JSON.parse(data);

  const artist = request.body;
  const result = artists.find((artist) => artist.id === id);

  result.name = artist.name;
  result.birthdate = artist.birthdate;
  result.activeSince = artist.activeSince;
  result.genres = artist.genres;
  result.labels = artist.labels;
  result.website = artist.website;
  result.image = artist.image;
  result.shortDescription = artist.shortDescription;

  fs.writeFile("data/artists.json", JSON.stringify(artists));

  console.log(request.body);
  response.json(artists);
});

//DELETE artists
app.delete("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  const data = await fs.readFile("data/artists.json");
  const artists = await JSON.parse(data);

  const removeArtist = artists.findIndex((artist) => artist.id === id);
  console.log(removeArtist);
  artists.splice(removeArtist, 1);
  console.log(artists);
  fs.writeFile("data/artists.json", JSON.stringify(artists));
  response.json(artists);
});

app.listen(port, () => {
  console.log(`The sever is running on port ${port}\nEnjoy your day :)`);
});
