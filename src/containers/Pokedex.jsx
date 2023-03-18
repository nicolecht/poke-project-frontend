// import React, { useEffect } from 'react';
// import { Link } from "react-router-dom";
// import * as pokemons from "../assets/pokemons";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPokemons } from '../actions/pokemonActions';

// const Pokedex = () => {
//   function PokemonCard(props) {
//     return (
//       <div className="pokemon-card">
//         <img src={pokemons[props.image]} alt="" />
//         <p>HP: {props.hp}</p>
//         <p>ATK: {props.atk}</p>
//         <p>DEF: {props.def}</p>
//         <p>TYPE: {props.type}</p>
//       </div>
//     );
//   }

//   const pokemonData = [
//     {
//       id: 1,
//       name: "Pikachu",
//       hp: 35,
//       atk: 55,
//       def: 40,
//       type: "Electric",
//       image: "pikachu",
//     },
//     {
//       id: 2,
//       name: "Charmander",
//       hp: 78,
//       atk: 84,
//       def: 78,
//       type: "Fire/Flying",
//       image: "charmander",
//     },
//     {
//       id: 3,
//       name: "Bulbasaur",
//       hp: 45,
//       atk: 49,
//       def: 49,
//       type: "Grass/Poison",
//       image: "bulbasaur",
//     },
//   ];

//   const pokemonCards = [];
//   for (let i = 0; i < pokemonData.length; i++) {
//     pokemonCards.push(
//       <PokemonCard
//         key={pokemonData[i].id}
//         image={pokemonData[i].image}
//         hp={pokemonData[i].hp}
//         atk={pokemonData[i].atk}
//         def={pokemonData[i].def}
//         type={pokemonData[i].type}
//       />
//     );
//   }

//   return (
//     <div className="my-5">
//       <div className="card card-body bg-light">
//         <h1 className="display-4">My Pokedex</h1>
//         <p className="lead">
//           This is a simple example of a Bootstrap jumbotron.
//         </p>
//         <hr className="my-4" />
//         <p>Click the Login button to proceed.</p>
//         <Link className="btn btn-primary btn-lg" to="/login" role="button">
//           Login
//         </Link>
//       </div>

//       <div className="container d-flex flex-wrap">{pokemonCards}</div>
//     </div>
//   );
// };

// export default Pokedex;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserPokemon } from "../actions/userpokemons";

const UserPokemon = ({ pokemonState, fetchUserPokemon }) => {
  useEffect(() => {
    fetchUserPokemon("superuser");
  }, [fetchUserPokemon]);

  const { loading, pokemon, error } = pokemonState || {};

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {pokemon &&
            pokemon.map((pokemon) => (
              <div key={pokemon.id}>
                <h3>Name: {pokemon.name}</h3>
                <p>HP: {pokemon.hp}</p>
                <p>ATK: {pokemon.attack}</p>
                <p>DEF: {pokemon.defense}</p>
                <p>TYPE: {pokemon.type}</p>
              </div>
            ))}
        </div>
      )}
      {error && <h2>{error}</h2>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pokemonState: state.userpokemons.pokemon[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserPokemon: (username) => dispatch(fetchUserPokemon(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPokemon);
