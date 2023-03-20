import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUnownedPokemon } from "../actions/unownedpokemons";
import { addUserPokemon } from "../actions/addpokemon";
import { Link } from "react-router-dom";
import * as pokemons from "../assets/pokemons";
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from "react-redux";

const UserPokemon = ({ pokemonState, fetchUnownedPokemon, addUserPokemon }) => {
  const authState = useSelector((state) => state.auth);
  const {
    loading: unownedPokemonsLoading,
    pokemon: unownedPokemons,
    error: unownedPokemonsError,
  } = useSelector((state) => state.unownedpokemons) || {};

  useEffect(() => {
    if (authState.user) {
      fetchUnownedPokemon(authState.user.username);
    }
  }, [authState, fetchUnownedPokemon]);

  const formatPokemonName = (name) => {
    const formattedName = name
      .toLowerCase()
      .replace(/\./g, "") // Remove periods
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except hyphens
      .replace(/\s+/g, ""); // Remove spaces
    return formattedName;
  };

  const [randomUnownedPokemon, setRandomUnownedPokemon] = useState({
    pokemon: "",
    displayPokemon: false,
  });

  const getRandomOwnedPokemon = () => {
    setRandomUnownedPokemon((previousState) => {
      return {
        ...previousState,
        pokemon:
          unownedPokemons[Math.floor(Math.random() * unownedPokemons.length)]
            .name,
        displayPokemon: !randomUnownedPokemon.displayPokemon,
      };
    });
  };

  return (
    <div>
      {unownedPokemonsLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {/* Display Pokemon */}
          {randomUnownedPokemon.displayPokemon ? (
            <div>
              <div className="pokemon-card">
                <img
                  src={
                    pokemons[formatPokemonName(randomUnownedPokemon.pokemon)]
                  }
                  alt=""
                />
                <p>Name: {randomUnownedPokemon.pokemon}</p>
              </div>
              <button
                className="btn btn-success"
                onClick={getRandomOwnedPokemon}
              >
                Another Card
              </button>
              <button
                className="btn btn-light w-100"
                onClick={() => addUserPokemon(randomUnownedPokemon.pokemon)}
              >
                Add {randomUnownedPokemon.pokemon}
              </button>
            </div>
          ) : (
            // Hide Pokemon
            <div className="pokemon-card back" onClick={getRandomOwnedPokemon}>
              <img src={pokemons["pokeball"]} alt="pokeball" />
              <p>{randomUnownedPokemon.pokemon}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUnownedPokemon: (username) => dispatch(fetchUnownedPokemon(username)),
    addUserPokemon: (pokemon_name) => dispatch(addUserPokemon(pokemon_name)),
  };
};

export default connect(null, mapDispatchToProps)(UserPokemon);
