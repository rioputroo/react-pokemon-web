import React from 'react';

function Card(props) {
  return (
    <div className="PokemonCard" onClick={props.clicked}>
      <img alt={props.pokemon.id} src={props.pokemon.image} />
      <h4>{props.pokemon.name}</h4>
    </div>
  );
}

export default Card;
