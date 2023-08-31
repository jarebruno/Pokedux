import { store, RootState, AppDispatch } from './store'
import {
  getPokemons,
  getPokemonDetailsASynchronously,
  getPokemonsASynchronously,
  getMainLoading,
  isFavouritePokemon,
  setFavouritePokemon,
  getPokemonDetails,
  removeFavouritePokemon,
  filterPokemons,
  getFilteredPokemons
} from './slices/pokemons'


export {
  store,
  getPokemonDetailsASynchronously,
  getPokemonsASynchronously,
  setFavouritePokemon,
  removeFavouritePokemon,
  filterPokemons,
  getPokemons,
  getMainLoading,
  getFilteredPokemons,
  isFavouritePokemon,
  getPokemonDetails
}

export type {
  RootState,
  AppDispatch
}
