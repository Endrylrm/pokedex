import * as fs from "node:fs/promises";
import { App_Page } from "./app";
import { Pokemon } from "./pokemon";

let pokeapi = "https://pokeapi.co/api/v2/pokemon/";

// Make a request for all pokemon names
async function FetchAllPokemons() {
  var pokemons = await fetch(pokeapi + "?limit=2000");
  var pokemons_json = await pokemons.json();
  await fs.writeFile("./pokemons.json", JSON.stringify(pokemons_json));
  console.log(pokemons_json);
}

// Make a request for a pokemon with a given ID
async function FetchPokemon(pokemon_input) {
  var pokemons = await fetch(pokeapi + pokemon_input);
  var pokemons_json = await pokemons.json();
  return pokemons_json;
}

export async function GetPokemon() {
  let pokemon_input = document
    .getElementById("pokemon_input")
    .value.toLowerCase();
  let pokemons_json = await FetchPokemon(pokemon_input);
  var pokemon_name =
    pokemons_json["name"].charAt(0).toUpperCase() +
    pokemons_json["name"].slice(1);
  Pokemon(
    pokemon_name,
    pokemons_json["sprites"]["front_default"],
    pokemons_json["sprites"]["front_shiny"]
  );
  App_Page(document.querySelector("#main-page"));
}

export async function searchPokemon(element) {
  element.addEventListener("click", () => GetPokemon());
}
