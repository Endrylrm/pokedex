import "./style.css";
import pokeapi_Logo from "/pokeapi.svg";

export function PokemonView(pokemon) {
  document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://pokeapi.co/" target="_blank">
      <img src="${pokeapi_Logo}" class="logo pokeapi" alt="Pokeapi logo" />
    </a>
    <h1>Pokedex!</h1>
    <div> 
      <img src="${pokemon.sprite}" class="pokemon" alt="${pokemon.name} sprite" />
      <img src="${pokemon.sprite_shiny}" class="pokemon" alt="Shiny ${pokemon.name} sprite" />
    </div>
    <div>
      <div class="card">
        <p>Nome do Pokemon</p>
        <input id="pokemon_name" value="${pokemon.name}" readonly></input>
      </div>
      <div class="card">
        <p>Desc. do Pokemon</p>
        <textarea id="pokemon_desc" rows="4" cols="60" readonly>${pokemon.description}</textarea>
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
