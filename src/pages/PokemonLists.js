/** @jsxImportSource @emotion/react */

import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../graphql/GraphPokemon';
import Card from '../components/Card/Card';
import Loading from '../components/Loading/Loading';
import './PokemonLists.css';
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

function PokemonLists(props) {
  const [isDataLengthState, setIsDataLengthState] = useState(0);
  const [pokemonState, setPokemonState] = useState([]);
  const [gqlVariableState] = useState({
    limit: 20,
    offset: 0,
  });

  const { loading, error, data } = useQuery(GET_POKEMONS, { variables: gqlVariableState });

  useEffect(() => {
    if (loading) return <Loading />;
    if (error) return 'No Pokemon around, try come again later :(';

    if (data) {
      setPokemonState(data.pokemons.results);
    }

    if (data.pokemons.results.length >= 5) {
      setIsDataLengthState(5);
    } else {
      setIsDataLengthState(data.pokemons.results.length);
    }
  }, [loading, error, data, pokemonState]);

  const pokemonSelectedHandler = (name) => {
    props.history.push('/pokemon/' + name);
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
      {data ? (
        data.pokemons.results.map((item) => {
          return (
            <Card key={item.id} pokemon={item} clicked={() => pokemonSelectedHandler(item.name)} />
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PokemonLists;
