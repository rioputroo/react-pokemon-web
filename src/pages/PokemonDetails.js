import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAILS } from '../graphql/GraphPokemon';

function PokemonDetails(props) {
  const gqlVariables = {
    name: props.match.params.name,
  };

  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: gqlVariables,
  });

  if (loading) return 'Loading...';
  if (error) return 'Error fetching pokemon details';

  console.log(data);

  return (
    <div className="PokemonDetails">
      <img alt={data.pokemon.name} src={data.pokemon.sprites.front_default} />
      <h2>{data.pokemon.name}</h2>
      {data.pokemon.types.map((type) => (
        <h4 key={type.type.name}>{type.type.name}</h4>
      ))}
      <button>Catch</button>
      {data.pokemon.moves.map((move) => (
        <p key={move.move.name}>{move.move.name}</p>
      ))}
    </div>
  );
}

export default PokemonDetails;
