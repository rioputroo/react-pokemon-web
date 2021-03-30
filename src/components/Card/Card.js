/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react';
import './Card.css';
import db from '../../services/DBConfig';
import { css } from '@emotion/react';

function Card(props) {
  const [pokemonCount, setPokemonCount] = useState(0);
  let count = 0;

  useEffect(() => {
    const pokemonDb = db.myPokemon.toArray();
    pokemonDb.then((item) => {
      item.forEach((pokemonFromDb) => {
        if (pokemonFromDb.pokemon_id === props.pokemon.id) count++;
      });
      setPokemonCount(count);
    });
  }, [count, props.pokemon.id]);


  return (
    <div className="PokemonCard" onClick={props.clicked}>
      <img alt={props.pokemon.id} src={props.pokemon.image} />
      <p>{props.pokemon.name}</p>
      {pokemonCount > 0 ? (
        <span
          className="PokeStatus"
          css={css`
            font-size: 11px;
            font-weight: 500;
            padding: 4px 8px;
            border-radius: 4px;
            color: #000;
            background-color: #f0c305;
          `}
        >
          You owned {pokemonCount}
        </span>
      ) : (
        <span className="PokeStatus">Not Owned</span>
      )}
    </div>
  );
}

export default Card;
