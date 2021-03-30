import React from 'react';
import './Card.css';

function Card(props) {
  return (
    <div className="PokemonCard" onClick={props.clicked}>
      <img alt={props.pokemon.id} src={props.pokemon.image} />
      <p>{props.pokemon.name}</p>
      <span className="PokeStatus">Not Owned</span>
    </div>
  );
}

export default Card;
