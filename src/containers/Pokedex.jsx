import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUserPokemon } from "../actions/userpokemons";
import { fetchAllPokemon } from "../actions/allpokemons";
import { fetchUnownedPokemon } from "../actions/unownedpokemons";
import { releaseUserPokemon } from "../actions/releasepokemon";
import { addUserPokemon } from "../actions/addpokemon";
import { Link } from "react-router-dom";
import * as pokemons from "../assets/pokemons";
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const UserPokemon = ({
  pokemonState,
  fetchUserPokemon,
  fetchAllPokemon,
  fetchUnownedPokemon,
  releaseUserPokemon,
  addUserPokemon,
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

  const [rerenderCount, setRerenderCount] = useState(0);

  useEffect(() => {
    if (authState.user) {
      fetchUserPokemon(authState.user.username);
      fetchUnownedPokemon(authState.user.username);
    }
  }, [rerenderCount, fetchUserPokemon, fetchUnownedPokemon]);

  const [layout, setLayout] = useState({
    showOwnedPokemons: true,
    showUnownedPokemons: false,
    showAllPokemons: false,
  });

  return (
    <div>
      {/* Owned Pokemons */}
      <div className="py-5">
        <h3>My Pokedex</h3>
        <div className="mt-5">
          <button
            className={`btn me-3 ${
              layout.showOwnedPokemons ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => {
              setLayout((previousState) => {
                return {
                  showOwnedPokemons: true,
                  showUnownedPokemons: false,
                  showAllPokemons: false,
                };
              });
            }}
          >
            Owned Pokemons
          </button>
          <button
            className={`btn me-3 ${
              layout.showUnownedPokemons ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => {
              setLayout((previousState) => {
                return {
                  showOwnedPokemons: false,
                  showUnownedPokemons: true,
                  showAllPokemons: false,
                };
              });
            }}
          >
            Unowned Pokemons
          </button>
          <button
            className={`btn ${
              layout.showAllPokemons ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => {
              setLayout((previousState) => {
                return {
                  showOwnedPokemons: false,
                  showUnownedPokemons: false,
                  showAllPokemons: true,
                };
              });
            }}
          >
            All Pokemons
          </button>
        </div>
      </div>
      {userLoading ? (
        <Loading />
      ) : (
        <div>
          {layout.showOwnedPokemons ? (
            <div>
              <div className="container d-flex flex-wrap">
                {userPokemon &&
                  userPokemon.map((pokemon) => (
                    <div key={pokemon.id}>
                      <div className="pokemon-card">
                        <img
                          src={pokemons[formatPokemonName(pokemon.name)]}
                          alt={pokemon.name}
                        />
                        <p>Name: {pokemon.name}</p>
                        <div className="pokemon-stats">
                          <p>LVL: {pokemon.level ? pokemon.level : 1}</p>
                          <p>HP: {pokemon.hp}</p>
                          <p>ATK: {pokemon.attack}</p>
                          <p>DEF: {pokemon.defense}</p>
                        </div>
                        <p>TYPE: {pokemon.type}</p>
                        <button
                          className="btn btn-outline-light w-100"
                          onClick={() => {
                            releaseUserPokemon(pokemon.name);
                            setRerenderCount(rerenderCount + 1);
                          }}
                        >
                          Release
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {/* {userError && <h2>{userError}</h2>} */}

      {/* Unowned Pokemons */}
      {unownedPokemonsLoading ? (
        <Loading />
      ) : (
        <div>
          {layout.showUnownedPokemons ? (
            <div>
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
          ) : (
            ""
          )}
        </div>
      )}
      {/* {unownedPokemonsError && <h2>{unownedPokemonsError}</h2>} */}

      {/* All Pokemons */}
      {allPokemonsLoading ? (
        <Loading />
      ) : (
        <div>
          {layout.showAllPokemons ? (
            <div>
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
          ) : (
            ""
          )}
        </div>
      )}
      {/* {allPokemonsError && <h2>{allPokemonsError}</h2>} */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserPokemon: (username) => dispatch(fetchUserPokemon(username)),
    fetchAllPokemon: () => dispatch(fetchAllPokemon()),
    fetchUnownedPokemon: (username) => dispatch(fetchUnownedPokemon(username)),
    releaseUserPokemon: (pokemon_name) =>
      dispatch(releaseUserPokemon(pokemon_name)),
    addUserPokemon: (pokemon_name) => dispatch(addUserPokemon(pokemon_name)),
  };
};

export default connect(null, mapDispatchToProps)(UserPokemon);
