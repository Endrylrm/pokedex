const pokemonList = document.getElementById("pokemons");
const loadMoreButton = document.getElementById("loadMore");

const maxRecords = 1302; // current max pokemon
const limit = 10;
let offset = 0;

function pokemonToListItem(pokemon) {
  return (
    `
        <li class="pokemon ${pokemon.mainType}">
          <span class="number">#${pokemon.id}</span>
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

const pokeapi = new PokeAPI(offset, limit);

function loadPokemons(offset, limit) {
  pokeapi.offset = offset;
  pokeapi.limit = limit;

  pokeapi.getPokemons().then((pokemons) => {
    console.log(pokemons);
    pokemonList.innerHTML += pokemons.map(pokemonToListItem).join("");
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
