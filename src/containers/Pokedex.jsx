import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserPokemon } from "../actions/userpokemons";
import { fetchAllPokemon } from "../actions/allpokemons";
import { fetchUnownedPokemon } from "../actions/unownedpokemons";
import { Link } from "react-router-dom";
import * as pokemons from "../assets/pokemons";
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from "react-redux";

const UserPokemon = ({
  pokemonState,
  fetchUserPokemon,
  fetchAllPokemon,
  fetchUnownedPokemon,
}) => {
  const authState = useSelector((state) => state.auth);
  const {
    loading: userLoading,
    pokemon: userPokemon,
    error: userError,
  } = useSelector((state) => state.userpokemons.pokemon[0]) || {};
  const {
    loading: allPokemonsLoading,
    pokemon: allPokemons,
    error: allPokemonsError,
  } = useSelector((state) => state.allpokemons) || {};
  const {
    loading: unownedPokemonsLoading,
    pokemon: unownedPokemons,
    error: unownedPokemonsError,
  } = useSelector((state) => state.unownedpokemons) || {};

  useEffect(() => {
    if (authState.user) {
      fetchUserPokemon(authState.user.username);
      fetchAllPokemon();
      fetchUnownedPokemon(authState.user.username);
    }
  }, [authState, fetchUserPokemon, fetchAllPokemon, fetchUnownedPokemon]);

  const formatPokemonName = (name) => {
    const formattedName = name
      .toLowerCase()
      .replace(/\./g, "") // Remove periods
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except hyphens
      .replace(/\s+/g, ""); // Remove spaces
    return formattedName;
  };

  return (
    <div>
      <div className="py-5">
        <h3>My Pokedex</h3>
      </div>
      {userLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h3 className="mx-4">Owned</h3>
          <div className="container d-flex flex-wrap">
            {userPokemon &&
              userPokemon.map((pokemon) => (
                <div key={pokemon.id}>
                  <div className="pokemon-card">
                    <img
                      src={pokemons[formatPokemonName(pokemon.name)]}
                      alt=""
                    />
                    <p>Name: {pokemon.name}</p>
                    <div className="pokemon-stats">
                      <p>LVL: {pokemon.level ? pokemon.level : 1}</p>
                      <p>HP: {pokemon.hp}</p>
                      <p>ATK: {pokemon.attack}</p>
                      <p>DEF: {pokemon.defense}</p>
                    </div>
                    <p>TYPE: {pokemon.type}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {userError && <h2>{userError}</h2>}

      {/* Unowned Pokemons */}
      <div className="py-5">
        <h3>Unowned</h3>
      </div>
      {unownedPokemonsLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h3 className="mx-4">All Pokemons</h3>
          <div className="container d-flex flex-wrap">
            {unownedPokemons &&
              unownedPokemons.map((pokemon) => (
                <div key={pokemon.id}>
                  <div className="pokemon-card">
                    <img
                      src={pokemons[formatPokemonName(pokemon.name)]}
                      alt=""
                    />
                    <p>Name: {pokemon.name}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {unownedPokemonsError && <h2>{unownedPokemonsError}</h2>}

      {/* All Pokemons */}
      <div className="py-5">
        <h3>Pokemon Universe</h3>
      </div>
      {allPokemonsLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h3 className="mx-4">All Pokemons</h3>
          <div className="container d-flex flex-wrap">
            {allPokemons &&
              allPokemons.map((pokemon) => (
                <div key={pokemon.id}>
                  <div className="pokemon-card">
                    <img
                      src={pokemons[formatPokemonName(pokemon.name)]}
                      alt=""
                    />
                    <p>Name: {pokemon.name}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {allPokemonsError && <h2>{allPokemonsError}</h2>}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserPokemon: (username) => dispatch(fetchUserPokemon(username)),
    fetchAllPokemon: () => dispatch(fetchAllPokemon()),
    fetchUnownedPokemon: (username) => dispatch(fetchUnownedPokemon(username)),
  };
};

export default connect(null, mapDispatchToProps)(UserPokemon);
