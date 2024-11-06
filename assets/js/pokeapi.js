class PokeAPI {
  constructor(offset, limit) {
    this.offset = offset;
    this.limit = limit;
  }

  async getPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`;

    const response = await fetch(url);
    const json = await response.json();
    const pokemons = json.results;
    const detailRequests = pokemons.map(this.getPokemonDetails);
    const pokemonsDetails = await Promise.all(detailRequests);
    return pokemonsDetails;
  }

  async getPokemonDetails(pokemon) {
    const response = await fetch(pokemon.url);
    const pokemonDetail = await response.json();

    const pokemonTypes = pokemonDetail.types.map(
      (typeSlot) => typeSlot.type.name
    );
    const [pokemonMainType] = pokemonTypes;

    return new Pokemon(
      pokemonDetail.id,
      pokemonDetail.name,
      pokemonMainType,
      pokemonTypes,
      pokemonDetail.sprites.other.dream_world.front_default
    );
  }
}
