import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAILS } from '../graphql/GraphPokemon';
import Loading from '../components/Loading/Loading';
import './PokemonDetails.css';
import Label from '../components/Label/Label';
import Stats from '../components/Stats/Stats';
import Move from '../components/Move/Move';
import pokeball from '../assets/icon-pokeball.png';
import { useState } from 'react';
import db from '../services/DBConfig';

function PokemonDetails(props) {
  const [catchPokemonState, setCatchPokemonState] = useState(null);

  const gqlVariables = {
    name: props.match.params.name,
  };

  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: gqlVariables,
  });

  if (loading) return <Loading />;
  if (error) return 'Error fetching pokemon details';

  const catchPokemon = () => {
    const calc = Math.random() >= 0.5;

    if (calc) {
      setCatchPokemonState(!catchPokemonState);
      addToDb();
    }
  };

  const releasePokemon = () => {
    setCatchPokemonState(false);
  };

  const addToDb = () => {
    db.myPokemon.add({ 
      pokemon_id: Date.now(),
      name: data.pokemon.name,
      image: data.pokemon.sprites.front_default
    });
  };

  return (
    <div className="PokemonDetails">
      <div className="Profile">
        <div className="Stats">
          <img alt={data.pokemon.name} src={data.pokemon.sprites.front_default} />
          <div className="StatsDetail">
            {data.pokemon.stats.map((stat, index) => (
              <Stats key={index} stats={stat} />
            ))}
          </div>
        </div>
        <h2>{data.pokemon.name}</h2>
        <div className="LabelList">
          {data.pokemon.types.map((type) => (
            <Label key={type.type.name} name={type.type.name} />
          ))}
        </div>
      </div>

      <button className="BtnCapture" onClick={catchPokemon}>
        <img alt="pokeball" src={pokeball} />
        Catch
      </button>

      {catchPokemonState ? (
        <button className="BtnCapture" onClick={releasePokemon}>
          <img alt="pokeball" src={pokeball} />
          Release
        </button>
      ) : null}

      <div className="Moves">
        <h3>List of moves</h3>
        {data.pokemon.moves.map((move) => (
          <Move key={move.move.name} name={move.move.name} />
        ))}
      </div>
    </div>
  );
}

export default PokemonDetails;
