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
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

function PokemonDetails(props) {
  const [catchPokemonState, setCatchPokemonState] = useState(null);
  const [modalIsOpen, setModailIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    msg: '',
    status: false,
  });

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
      // addToDb();
      setModalMessage({
        msg: 'You got a Pokemon!!! You can set nickname for this pokemon',
        status: true,
      });
    } else {
      setModalMessage({
        msg: "Unfortunately you didn't catch that. Don't give up!",
        status: false,
      });
    }

    showModal();
  };

  const addToDb = (nickname) => {
    db.myPokemon.add({
      random_id: Date.now(),
      pokemon_id: data.pokemon.id,
      name: data.pokemon.name,
      image: data.pokemon.sprites.front_default,
      nickname: nickname,
    });
  };

  const showModal = () => {
    setModailIsOpen(true);
  };

  const closeModal = (inputData) => {
    if (modalMessage.status) {
      addToDb(inputData);
      console.log(db.myPokemon.toArray());
      props.history.push('/my-pokemon/');
    }
    setModailIsOpen(false);
  };

  return (
    <div className="PokemonDetails">
      <Modal
        show={modalIsOpen}
        closed={(inputData) => closeModal(inputData)}
        message={modalMessage}
      />
      <Backdrop show={modalIsOpen} />

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
