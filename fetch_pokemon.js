import * as fs from "node:fs/promises";
import { App_Page } from "./app";
import { Pokemon } from "./pokemon";
import { PokemonView } from "./pokemon_view";

let pokeapi = "https://pokeapi.co/api/v2/";

// Make a request for all pokemon names
async function FetchAllPokemons() {
  var pokemons = await fetch(pokeapi + "pokemon/?limit=2000");
  var pokemons_json = await pokemons.json();
  await fs.writeFile("./pokemons.json", JSON.stringify(pokemons_json));
  console.log(pokemons_json);
}

// Make a request for a pokemon with a given ID or name
async function FetchPokemon(pokemon_input) {
  var pokemons = await fetch(pokeapi + "pokemon/" + pokemon_input);
  var pokemons_json = await pokemons.json();
  return pokemons_json;
}

// Make a request for a pokemon specie with a given ID or name
async function FetchPokemonSpecies(pokemon_input) {
  var species = await fetch(pokeapi + "pokemon-species/" + pokemon_input);
  var species_json = await species.json();
  return species_json;
}

export async function GetPokemon() {
  let pokemon_input = document
    .getElementById("pokemon_input")
    .value.toLowerCase();
  const regex = new RegExp("(\\n|\\u000c)", "gi");
  let pokemons_json = await FetchPokemon(pokemon_input);
  let species_json = await FetchPokemonSpecies(pokemon_input);
  let description = species_json["flavor_text_entries"][0]["flavor_text"];
  let pokemon_obj = new Pokemon(
    species_json["names"][8]["name"],
    description.replaceAll(regex, " "),
    pokemons_json["sprites"]["front_default"],
    pokemons_json["sprites"]["front_shiny"]
  );
  PokemonView(pokemon_obj);
  App_Page(document.querySelector("#main-page"));
}

export async function searchPokemon(element) {
  element.addEventListener("click", () => GetPokemon());
}
