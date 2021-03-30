import { useQuery } from '@apollo/client';
import { GET_POKEMON_DETAILS } from '../graphql/GraphPokemon';
import Loading from '../components/Loading/Loading';
import './PokemonDetails.css';
import Label from '../components/Label/Label';
import Stats from '../components/Stats/Stats';
import Move from '../components/Move/Move';
import pokeball from '../assets/icon-pokeball.png';

function PokemonDetails(props) {
  const gqlVariables = {
    name: props.match.params.name,
  };

  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: gqlVariables,
  });

  if (loading) return <Loading />;
  if (error) return 'Error fetching pokemon details';

  console.log(data);

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

      <button className="BtnCapture">
        <img alt="pokeball" src={pokeball} />
        Catch</button>
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
