/** @jsxImportSource @emotion/react */

import db from '../services/DBConfig';
import { useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import './MyPokemonLists.css';
import { css } from '@emotion/react';

function MyPokemonLists(props) {
  const [myPokemonState, setMyPokemonState] = useState([]);
  const [isMyPokemonState, setIsMyPokemonState] = useState(false);
  const [isDataLengthState, setIsDataLengthState] = useState(0);

  useEffect(() => {
    const getMyPokemon = db.myPokemon.toArray();

    getMyPokemon.then((pokemon) => {
      setMyPokemonState(pokemon);
      if (pokemon.length >= 5) {
        setIsDataLengthState(5);
      } else {
        setIsDataLengthState(pokemon.length);
      }
    });

    setIsMyPokemonState(props.match.path === '/my-pokemon');
  }, [props.match.path]);

  const pokemonSelectedHandler = (name) => {
    props.history.push('/pokemon/' + name);
  };

  return (
    <div
      className="MyPokemonLists"
      css={css`
        display: grid;
        justify-content: center;
        gap: 16px 16px;
        grid-auto-flow: row;
        padding-bottom: 90px;
        grid-template-columns: repeat(${isDataLengthState}, 1fr);
        @media all and (max-width: 1200px) {
          grid-template-columns: repeat(4, 1fr);
        };
        @media all and (max-width: 950px) {
          grid-template-columns: repeat(3, 1fr);
        };
        @media all and (max-width: 590px) {
          grid-template-columns: repeat(2, 1fr);
        };
      `}
    >
      {myPokemonState ? (
        myPokemonState.map((pokemon) => (
          <Card
            key={pokemon.random_id}
            pokemon={pokemon}
            clicked={() => pokemonSelectedHandler(pokemon.name)}
            isMyPokemon={isMyPokemonState}
          />
        ))
      ) : (
        <h2>You don't have any pokemon yet!</h2>
      )}
    </div>
  );
}

export default MyPokemonLists;
