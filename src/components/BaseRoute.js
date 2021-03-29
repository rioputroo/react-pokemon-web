import { Route, Switch } from 'react-router-dom';
import MyPokemonLists from '../pages/MyPokemonLists';
import PokemonDetails from '../pages/PokemonDetails';
import PokemonLists from '../pages/PokemonLists';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../graphql/GraphPokemon';

function BaseRoute() {
  const gqlVariables = {
    limit: 10,
    offset: 0,
  };

  const { loading, error, data } = useQuery(GET_POKEMONS, { variables: gqlVariables });
  if (loading) return 'Loading...';
  if (error) return 'Error!';

  if (data) {
    console.log(data);
  }

  return (
    <Switch>
      <Route path="/pokemon/:name" component={PokemonDetails}></Route>
      <Route path="/my-pokemon" component={MyPokemonLists}></Route>
      <Route path="/" component={PokemonLists}></Route>
      <Route render={() => <h1>Sorry, Not Found</h1>} />
    </Switch>
  );
}

export default BaseRoute;
