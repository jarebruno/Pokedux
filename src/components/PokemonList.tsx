import React from 'react'
import { PokemonCard } from './PokemonCard'
import './PokemonList.css'
import { useAppSelector } from '../hooks/useAppSelector'
import { getFilteredPokemons } from '../store'

export function PokemonList() {

  const pokemons = useAppSelector(getFilteredPokemons)

  return (
    <div className='PokemonList'>
      {
        pokemons.map((pokemon) => {
          return (
            <div key={pokemon.name}>
              <PokemonCard pokemon={pokemon}/>
            </div>
          )
        })
      }
    </div>
  )
}