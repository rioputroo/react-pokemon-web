import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      nextOffset
      prevOffset
      status
      results {
        id
        name
        image
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      weight
      height
      moves{
        move{
          name
        }
      }
      types{
        type{
          name
        }
      }
      stats{
        base_stat
        stat{
          name
        }
      }
      sprites{
        front_default
      }
    }
  }
`;
