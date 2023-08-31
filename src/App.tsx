import React from 'react';
import './App.css';
import { PokemonList, Searcher } from './components';
import logo from './statics/logo.svg'
import { Col, Spin } from 'antd'
import { getPokemons, getPokemonsASynchronously, getMainLoading, getPokemonDetailsASynchronously } from './store';
import { useAppSelector } from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useRequest } from 'ahooks';

function App() {
  const pokemons = useAppSelector(getPokemons)
  const loading = useAppSelector(getMainLoading)
  const dispatch = useAppDispatch()

  useRequest(
    async () => dispatch(getPokemonsASynchronously()),
    {
      ready: pokemons.length === 0
    }
  )
  
  useRequest(
    async () => pokemons.forEach((pokemon) => dispatch(getPokemonDetailsASynchronously(pokemon))),
    {
      ready: pokemons.length !== 0
    }
  )
  
  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedex logo'/>
      </Col>
      <Col span={8} offset={8}>
        <Searcher/>
      </Col>
      {
        loading 
          ?
            <Col offset={12}>
              <Spin spinning size='large'/>
            </Col>
          : <PokemonList />
      }
    </div>
  );
}

export default App;
