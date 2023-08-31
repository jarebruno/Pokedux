import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Pokemon, PokemonDetails, getPokemonDetails as getPokemonDetaisFromApi, getPokemons as getPokemonsFromApi } from '../../api'
import { RootState } from '../store'

export interface PokemonsState {
  loading: boolean,
  pokemons: Pokemon[],
  filteredPokemons: Pokemon[],
  favourites: Pokemon[],
  pokemonsDetails: Record<string, PokemonDetails>
}

const initialState: PokemonsState = {
  loading: false,
  pokemons: [],
  filteredPokemons: [],
  favourites: [],
  pokemonsDetails: {}
}

export const getPokemonDetailsASynchronously = createAsyncThunk('getPokemonDetailsASynchronously', async (pokemon: Pokemon) => {
  return getPokemonDetaisFromApi(pokemon.name)
})

export const getPokemonsASynchronously = createAsyncThunk('getPokemons', async () => {
  return getPokemonsFromApi()
})

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setFavouritePokemon: (state: PokemonsState, action: PayloadAction<Pokemon>): PokemonsState => {
      return {...state, favourites: state.favourites.concat(action.payload) }
    },
    removeFavouritePokemon: (state: PokemonsState, action: PayloadAction<Pokemon>):PokemonsState => {
      const newFavourites = [...state.favourites]
      const index = state.favourites.findIndex((favourite) => favourite.name === action.payload.name)
      if (index > -1) newFavourites.splice(index, 1)
      return {...state, favourites: newFavourites }
    },
    filterPokemons: (state: PokemonsState, action: PayloadAction<string>) => {
      state.filteredPokemons = state.pokemons.filter((pokemon) => pokemon.name.includes(action.payload))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonsASynchronously.pending, (state: PokemonsState): PokemonsState => {
        return {...state, loading: true}
      })
      .addCase(getPokemonsASynchronously.fulfilled, (state: PokemonsState, action: PayloadAction<Pokemon[]>): PokemonsState => {
        return {...state, loading: false, pokemons: action.payload, filteredPokemons: action.payload}
      })
      .addCase(getPokemonsASynchronously.rejected, (state: PokemonsState): PokemonsState => {
        return {...state, loading: false}
      })
      .addCase(getPokemonDetailsASynchronously.fulfilled, (state: PokemonsState, action: PayloadAction<PokemonDetails>): PokemonsState => {
        return {...state, pokemonsDetails: {...state.pokemonsDetails, [action.payload.name] : action.payload}}
      })
  },
})

export const getMainLoading = (state: RootState): boolean => state.pokemons.loading
export const getPokemons = (state: RootState): Pokemon[] => state.pokemons.pokemons
export const getFilteredPokemons = (state: RootState): Pokemon[] => state.pokemons.filteredPokemons
export const isFavouritePokemon = (pokemon: Pokemon) => (state: RootState): boolean => Boolean(state.pokemons.favourites.find((favourite) => favourite.name.toLowerCase() === pokemon.name.toLowerCase()))
export const getPokemonDetails = (pokemon: Pokemon) => (state: RootState): PokemonDetails | undefined => state.pokemons.pokemonsDetails[pokemon.name]

export const { setFavouritePokemon, removeFavouritePokemon, filterPokemons } = pokemonsSlice.actions
