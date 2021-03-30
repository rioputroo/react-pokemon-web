import pointer from '../../assets/pointer.png';
import camera from '../../assets/camera.png';
import pokemonLogo from '../../assets/pokemon-logo.svg';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import PokemonLists from '../../pages/PokemonLists';

function Navbar() {
  return (
    <div className="Navbar">
      <header>
        <nav>
          <Link to="/">
            <span className="Logo">
              <img alt="pokemon-logo" src={pokemonLogo} />
            </span>
          </Link>
          <ul className="ListNav">
            <li>
              <NavLink to="/" exact>
                <img alt="explore-logo" src={pointer} />
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-pokemon">
                <img alt="my-pokemon-lists" src={camera} />
                My Pokemon Lists
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
