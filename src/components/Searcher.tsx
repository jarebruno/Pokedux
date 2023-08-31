import React from 'react';
import { Input } from 'antd'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { filterPokemons } from '../store';

export function Searcher () {
  const dispatch = useAppDispatch()
  return (
    <Input.Search placeholder='Search...' onSearch={ (value) => dispatch(filterPokemons(value)) }/>
  )
}