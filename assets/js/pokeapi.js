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

  async getPokemonStats(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const pokemonStats = await response.json();
    const pokemonSpecies = await this.getPokemonSpecies(id);

    console.log(pokemonSpecies);

    const flavorTexts = pokemonSpecies.flavor_text_entries
      .filter(
        (data) => data.language.url === "https://pokeapi.co/api/v2/language/9/"
      )
      .map((text) => text.flavor_text);

    const pokemonTypes = pokemonStats.types.map(
      (typeSlot) => typeSlot.type.name
    );
    const [pokemonMainType] = pokemonTypes;

    const pokemon = new Pokemon(
      pokemonStats.id,
      pokemonStats.name,
      pokemonMainType,
      pokemonTypes,
      pokemonStats.sprites.other.showdown.front_default
    );

    pokemon.shinyImage = pokemonStats.sprites.other.showdown.front_shiny;
    pokemon.stats = pokemonStats.stats.map((stat) => stat.base_stat);
    pokemon.flavorTexts = flavorTexts;

    return pokemon;
  }

  async getPokemonSpecies(id) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const response = await fetch(url);
    const pokemonSpecies = await response.json();
    return pokemonSpecies;
  }
}
