import { configureStore } from '@reduxjs/toolkit'
import { pokemonsSlice } from './slices/pokemons'
// import { loggerMiddleware } from './middlewares'

export const store = configureStore({
  reducer: {
    pokemons: pokemonsSlice.reducer
  },
  devTools: true,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(loggerMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch