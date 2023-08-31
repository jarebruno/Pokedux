import React from 'react';
import { Card, Spin } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useAppSelector } from '../hooks/useAppSelector';
import { getPokemonDetails, isFavouritePokemon, removeFavouritePokemon, setFavouritePokemon } from '../store';
import { Pokemon } from '../api';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { StarButton } from './StarButton';

type Props = {
  pokemon: Pokemon
}

export function PokemonCard ({pokemon} : Props) {
  const pokemonDetails = useAppSelector(getPokemonDetails(pokemon))
  const isFavourite = useAppSelector(isFavouritePokemon(pokemon))
  const dispatch = useAppDispatch()

  return (
    <Card 
      title={pokemon.name}
      extra={<StarButton isFavourite={isFavourite} onClick={() => isFavourite ? dispatch(removeFavouritePokemon(pokemon)) : dispatch(setFavouritePokemon(pokemon))}/>} 
      cover={
        pokemonDetails
          ? <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
          : <Spin spinning/>
      }>
        <Meta description={pokemonDetails?.types.map((type) => type.type.name).join(', ') || 'Unknown'}/>
    </Card>
  )
}