/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react';
import './Card.css';
import db from '../../services/DBConfig';
import { css } from '@emotion/react';
import pokeball from '../../assets/icon-pokeball.png';
import { useHistory } from 'react-router';

function Card(props) {
  const [pokemonCount, setPokemonCount] = useState(0);

  let count = 0;
  let pokemonAction = '';

  useEffect(() => {
    const pokemonDb = db.myPokemon.toArray();

    pokemonDb.then((item) => {
      item.forEach((pokemonFromDb) => {
        if (pokemonFromDb.pokemon_id === props.pokemon.id) count++;
      });
      setPokemonCount(count);
    });
  }, [count, props.pokemon.id, pokemonCount]);

  const releasePokemon = (e) => {
    e.stopPropagation();
    db.myPokemon.delete(props.pokemon.id);
    window.location.reload();
  };

  if (props.isMyPokemon) {
    pokemonAction = (
      <button
        css={css`
          outline: none;
          cursor: pointer;
          padding: 8px 32px;
          box-shadow: 0 1px 4px -2px grey;
          background: #34d399;
          font-weight: bold;
          font-size: 0.9em;
          text-transform: uppercase;
          color: #fff;
          border: none;
          box-shadow: 0 2px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
          display: flex;
          align-items: center;
          text-decoration: none;
          margin: 0 16px;
          padding: 8px 27px;
          border-radius: 8px;
        `}
        onClick={releasePokemon}
      >
        <img
          css={css`
            width: 40px;
            height: 40px;
            margin-right: 24px;
          `}
          alt="pokeball"
          src={pokeball}
        />
        Release
      </button>
    );
  } else {
    if (pokemonCount > 0) {
      pokemonAction = (
        <span
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
      );
    } else {
      pokemonAction = <span className="PokeStatus">Not Owned</span>;
    }
  }

  return (
    <div className="PokemonCard" onClick={props.clicked}>
      <img alt={props.pokemon.id} className="PokemonCardImage" src={props.pokemon.image} />
      <p>{props.pokemon.name}</p>
      {pokemonAction}
    </div>
  );
}

export default Card;
