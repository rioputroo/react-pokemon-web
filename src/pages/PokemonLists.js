/** @jsxImportSource @emotion/react */

import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../graphql/GraphPokemon';
import Card from '../components/Card/Card';
import Loading from '../components/Loading/Loading';
import './PokemonLists.css';
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

function PokemonLists(props) {
  const [isDataLengthState, setIsDataLengthState] = useState(5);
  const [isMyPokemonState, setIsMyPokemonState] = useState(false);
  const [pokemonState, setPokemonState] = useState([]);
  const [availableNext, setAvailableNext] = useState(0);

  const [gqlVariableState, setGqlVariableState] = useState({
    limit: 20,
    offset: 0,
  });

  const { loading, error, data } = useQuery(GET_POKEMONS, { variables: gqlVariableState });

  useEffect(() => {
    if (loading) return <Loading />;
    if (error) return 'No Pokemon around, try come again later :(';

    if (data) {
      setPokemonState(data.pokemons.results);
      setAvailableNext(data.pokemons.nextOffset);
    }

    setIsMyPokemonState(props.match.path === '/my-pokemon');

    if (data.pokemons.results.length < 5) {
      setIsDataLengthState(data.pokemons.results.length);
    }
  }, [loading, error, data, pokemonState, props.match.path]);

  const pokemonSelectedHandler = (name) => {
    props.history.push('/pokemon/' + name);
  };

  const loadMorePokemons = (offset) => {
    const newGqlVariable = { limit: 20 + offset, offset: 0 };
    setGqlVariableState(newGqlVariable);
  };

  return (
    <div
      className="PokemonLists"
      css={css`
        display: grid;
        justify-content: center;
        gap: 16px 16px;
        grid-auto-flow: row;
        grid-template-columns: repeat(${isDataLengthState}, 1fr);
      `}
    >
      {pokemonState ? (
        pokemonState.map((item) => {
          return (
            <Card
              key={item.id}
              pokemon={item}
              clicked={() => pokemonSelectedHandler(item.name)}
              isMyPokemon={isMyPokemonState}
            />
          );
        })
      ) : (
        <Loading />
      )}

      {availableNext > 0 ? (
        <button
          css={css`
            grid-column: 3;
            box-shadow: 0 2px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
            font-weight: 500;
            text-transform: uppercase;
            margin: 0 16px;
            padding: 8px 32px;
            border-radius: 8px;
            background-color: #dc2626;
            color: #fff;
            border: none;
            outline: none;
            cursor: pointer;
          `}
          onClick={() => loadMorePokemons(availableNext)}
        >
          Load More
        </button>
      ) : null}
    </div>
  );
}

export default PokemonLists;
