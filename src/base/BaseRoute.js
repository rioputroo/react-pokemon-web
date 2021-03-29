import { Route, Switch } from 'react-router-dom';
import MyPokemonLists from '../pages/MyPokemonLists';
import PokemonDetails from '../pages/PokemonDetails';
import PokemonLists from '../pages/PokemonLists';

function BaseRoute() {
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
