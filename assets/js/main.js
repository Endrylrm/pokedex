const pokemonList = document.getElementById("pokemons");
const pokemonDetailPage = document.getElementById("pokemon-detail");
const loadMoreButton = document.getElementById("loadMore");
const searchBar = document.getElementById("search-bar");

const maxRecords = 151; // current max pokemon
const limit = 10;
let offset = 0;

function pokemonToListItem(pokemon) {
  return (
    `
        <li onclick="loadPokemonStats(${pokemon.id});" class="pokemon ${
      pokemon.mainType
    }">
          <span class="id">#${pokemon.id}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
            </ol>
            <img
              src="${pokemon.image}"
              alt="${pokemon.name}"
            />
          </div>
        </li>`
      // remover a primeira linha vazia
      .split("\n")
      .slice(1)
      .join("\n")
  );
}

function pokemonToDetailPage(pokemon) {
  return (
    `
      <div class="pokemon-header ${pokemon.mainType}">
          <div class="pokemon-buttons">
            <button
              id="return-to-pokemon-list"
              type="button"
              onclick="returnToPokemonList();"
            >
              <img src="assets/img/return-arrow.svg" alt="return button" />
            </button>
          </div>
          <div class="pokemon-title">
            <span class="name">${pokemon.name}</span>
            <span class="id">#${pokemon.id}</span>
          </div>
          <div class="pokemon-types">
            <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
            </ol>
          </div>
          <div class="pokemon-images">
            <button
              class="arrow-button left-button"
              type="button"
              onclick="loadPokemonStats(${pokemon.id - 1});"
            >
              <img src="assets/img/left-arrow.svg" alt="back button" />
            </button>
            <img
              src="${pokemon.image}"
              alt="${pokemon.name}"
            />
            <img
              src="${pokemon.shinyImage}"
              alt="shiny ${pokemon.name}"
            />
            <button
              class="arrow-button right-button"
              type="button"
              onclick="loadPokemonStats(${pokemon.id + 1});"
            >
              <img src="assets/img/right-arrow.svg" alt="back button" />
            </button>
          </div>
          <div class="pokemon-images">
            <span class="name">Common ${pokemon.name}</span>
            <span class="name">Shiny ${pokemon.name}</span>
          </div>
        </div>
        <div class="pokemon-stats">
          <h1 class="details-title">Flavor Text</h1>
          <p class="flavor-text">${pokemon.getRandomFlavorText()}</p>
          <h1 class="details-title">Base Stats</h1>
          <div class="stats">
            <span class="stats-label">HP:</span>
            <span class="stats-value">${pokemon.stats[0]}</span>
            <progress
              class="stats-bar bar-${pokemon.mainType}"
              value="${pokemon.stats[0]}"
              max="100"
            ></progress>
          </div>
          <div class="stats">
            <span class="stats-label">Attack:</span>
            <span class="stats-value">${pokemon.stats[1]}</span>
            <progress
              class="stats-bar bar-${pokemon.mainType}"
              value="${pokemon.stats[1]}"
              max="100"
            ></progress>
          </div>
          <div class="stats">
            <span class="stats-label">Defense:</span>
            <span class="stats-value">${pokemon.stats[2]}</span>
            <progress
              class="stats-bar bar-${pokemon.mainType}"
              value="${pokemon.stats[2]}"
              max="100"
            ></progress>
          </div>
          <div class="stats">
            <span class="stats-label">Sp. Attack:</span>
            <span class="stats-value">${pokemon.stats[3]}</span>
            <progress
              class="stats-bar bar-${pokemon.mainType}"
              value="${pokemon.stats[3]}"
              max="100"
            ></progress>
          </div>
          <div class="stats">
            <span class="stats-label">Sp. Defense:</span>
            <span class="stats-value">${pokemon.stats[4]}</span>
            <progress
              class="stats-bar bar-${pokemon.mainType}"
              value="${pokemon.stats[4]}"
              max="100"
            ></progress>
          </div>
          <div class="stats">
            <span class="stats-label">Speed:</span>
            <span class="stats-value">${pokemon.stats[5]}</span>
            <progress
              class="stats-bar bar-${pokemon.mainType}"
              value="${pokemon.stats[5]}"
              max="100"
            ></progress>
          </div>
        </div>
        <div class="stats">
          <span class="stats-label">Total:</span>
          <span class="stats-value">${pokemon.getTotalPoints()}</span>
          <progress class="stats-bar bar-${
            pokemon.mainType
          }" value="${pokemon.getTotalPoints()}" max="600"></progress>
        </div>`
      // remover a primeira linha vazia
      .split("\n")
      .slice(1)
      .join("\n")
  );
}

const pokeapi = new PokeAPI(offset, limit);

function loadPokemons(offset, limit) {
  pokeapi.offset = offset;
  pokeapi.limit = limit;

  pokeapi.getPokemons().then((pokemons) => {
    pokemonList.innerHTML += pokemons.map(pokemonToListItem).join("");

    filterPokemons(searchBar.value.toLowerCase().trim());
  });
}

function loadPokemonStats(id) {
  if (id <= 0) {
    id = maxRecords;
  }
  if (id > maxRecords) {
    id = 1;
  }

  pokemonDetailPage.innerHTML = "";

  pokeapi.getPokemonStats(id).then((pokemon) => {
    pokemonDetailPage.innerHTML = pokemonToDetailPage(pokemon);
  });
  document.getElementById("pokedex-content").className = "hidden";
  document.getElementById("pokemon-detail").className = "";
}

function returnToPokemonList() {
  document.getElementById("pokedex-content").className = "";
  document.getElementById("pokemon-detail").className = "hidden";
}

function filterPokemons(value) {
  const pokemons = document.querySelectorAll("#pokemons .pokemon");

  pokemons.forEach((pokemon) => {
    if (pokemon.textContent.indexOf(value) !== -1) {
      pokemon.style.display = "flex";
    } else {
      pokemon.style.display = "none";
    }
  });
}

loadPokemons(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const recordsWithNextPage = offset + limit;

  if (recordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemons(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemons(offset, limit);
  }
});

searchBar.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase().trim();

  filterPokemons(value);
});
