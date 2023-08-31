import axios from 'axios'


export type Pokemon = {
  name: string,
  url: string
}

export type Sprites = {
  front_default: string
}

export type TypeDetails = {
  name: string,
  url: string
}

export type Type = {
  slot: number,
  type: TypeDetails
}

export type AbilityDetails = {
  name: string,
  url: string
}

export type Ability = {
  ability: AbilityDetails,
  is_hidden: boolean,
  slot: number
}

export type PokemonDetails = {
  name: string,
  abilities: Ability[],
  types: Type[],
  sprites: Sprites
}


type PokemonsResponse = {
  count: number,
  next: string,
  previous: string,
  results: Pokemon[]
}

type AxiosResponse<T> = {
  data: T
}

export const getPokemons = async (): Promise<Pokemon[]> => {
  const pokemonsResponse: AxiosResponse<PokemonsResponse> = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
  return pokemonsResponse.data.results
}

export const getPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const pokemonDetailsResponse: AxiosResponse<PokemonDetails> = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if (pokemonDetailsResponse.data.types === undefined) console.log(pokemonDetailsResponse)
  return pokemonDetailsResponse.data
}