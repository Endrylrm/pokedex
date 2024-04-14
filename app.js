import "./style.css";
import pokeapi_Logo from "/pokeapi.svg";

import { GetPokemon, searchPokemon } from "./fetch_pokemon";

export function App() {
  document.querySelector("#app").innerHTML = `
    <div>
      <a href="https://pokeapi.co/" target="_blank">
        <img src="${pokeapi_Logo}" class="logo" alt="Pokeapi logo" />
      </a>
      <h1>Pokedex!</h1>
      <p>Buscar Pokemon</p>
      <input id="pokemon_input"></input>
      <div class="card">
        <button id="pokedex" type="button">Puxar dados do Pokemon</button>
      </div>
      <p class="footer-text">
        Criado usando a API do pokeapi + ViteJS.
      </p>
    </div>
  `;
}

function event_Input() {
  document
    .querySelector("#pokemon_input")
    .addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        GetPokemon();
      }
    });
}

export function Start_App() {
  App();
  event_Input();
  searchPokemon(document.querySelector("#pokedex"));
}

export function App_Page(element) {
  element.addEventListener("click", () => {
    Start_App();
  });
}
