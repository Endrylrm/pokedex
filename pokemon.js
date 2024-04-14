import "./style.css";
import pokeapi_Logo from "/pokeapi.svg";

export function Pokemon(pokemon_name, pokemon_spr, pokemon_shiny_spr) {
  document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://pokeapi.co/" target="_blank">
      <img src="${pokeapi_Logo}" class="logo pokeapi" alt="Pokeapi logo" />
    </a>
    <h1>Pokedex!</h1>
    <div> 
      <img src="${pokemon_spr}" class="pokemon" alt="${pokemon_name} sprite" />
      <img src="${pokemon_shiny_spr}" class="pokemon" alt="Shiny ${pokemon_name} sprite" />
    </div>
    <div>
      <div class="card">
        <p>Nome do Pokemon</p>
        <input id="pokemon_name" readonly value="${pokemon_name}"></input>
      </div>
    </div>
    <div class="card">
        <button id="main-page" type="button">Procurar outro Pokemon</button>
    </div>
    <p class="footer-text">
      Criado usando a API do pokeapi + ViteJS.
    </p>
  </div>
`;
}
