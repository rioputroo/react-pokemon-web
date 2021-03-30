import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../graphql/GraphPokemon';
import Card from '../components/Card';
import Loading from '../components/Loading/Loading';
import './PokemonLists.css';

function PokemonLists(props) {
  const gqlVariables = {
    limit: 20,
    offset: 0,
  };

  const { loading, error, data } = useQuery(GET_POKEMONS, { variables: gqlVariables });

  if (loading) return <Loading />;
  if (error) return 'Error!';

  if (data) {
    console.log(data);
  }

  const pokemonSelectedHandler = (name) => {
    props.history.push('/pokemon/' + name);
  };

  return (
    <div className="PokemonLists">
      {data
        ? data.pokemons.results.map((item) => {
            return (
              <Card
                key={item.id}
                pokemon={item}
                clicked={() => pokemonSelectedHandler(item.name)}
              />
            );
          })
        : 'No pokemons :('}
    </div>
  );
}

export default PokemonLists;
