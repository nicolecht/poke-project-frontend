import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUnownedPokemon } from "../actions/unownedpokemons";
import { addUserPokemon } from "../actions/addpokemon";
import { Link } from "react-router-dom";
import * as pokemons from "../assets/pokemons";
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

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

  const [pokemon, setPokemon] = useState({
    pokemonName: "",
    displayPokemon: false,
    correctNumber: Math.ceil(Math.random() * 10),
    guessNumber: Number,
    maximumGuesses: 3,
    userWin: false,
    forceCapture: false,
  });

  const getRandomOwnedPokemon = () => {
    setPokemon((previousState) => {
      return {
        ...previousState,
        pokemonName:
          unownedPokemons[Math.floor(Math.random() * unownedPokemons.length)]
            .name,
        displayPokemon: !pokemon.displayPokemon,
        correctNumber: Math.ceil(Math.random() * 10),
        remainingGuesses: 3,
        userWin: false,
        forceCapture: false,
      };
    });
  };

  // useEffect(() => {
  //   if (pokemon.remainingGuesses == 0) {
  //     getRandomOwnedPokemon();
  //   }
  // }, [pokemon, getRandomOwnedPokemon]);

  const onGuessChange = (e) => {
    setPokemon((previousState) => {
      return {
        ...previousState,
        guessNumber: e.target.value,
      };
    });
  };

  const onSubmitNumber = (e) => {
    e.preventDefault();

    if (pokemon.correctNumber == pokemon.guessNumber) {
      addUserPokemon(pokemon.pokemonName);
      setPokemon((previousState) => {
        return {
          ...previousState,
          userWin: true,
        };
      });
    } else {
      setPokemon((previousState) => {
        return {
          ...previousState,
          remainingGuesses: pokemon.remainingGuesses - 1,
        };
      });
    }
  };

  //// **** add Force Capture **** ////
  //// **** add animation/prompt when user wins the game (catched all 16) **** ////
  //// **** separate the divs into functions - just like what was done in Navbar component **** ////

  return (
    <div className="container p-5">
      {unownedPokemonsLoading ? (
        <Loading />
      ) : (
        <div>
          {pokemon.displayPokemon ? (
            // Display Pokemon
            <div className="row">
              <div className="col-6 d-flex flex-column">
                <div className="mx-auto">
                  <div className="pokemon-card">
                    <img
                      src={pokemons[formatPokemonName(pokemon.pokemonName)]}
                      alt=""
                    />
                    <p>Name: {pokemon.pokemonName}</p>
                  </div>
                </div>
                <button
                  className="btn btn-success w-50 mx-auto my-2"
                  onClick={getRandomOwnedPokemon}
                >
                  Change Card
                </button>
                <button
                  className="btn btn-light w-50 mx-auto my-2"
                  onClick={() => {
                    addUserPokemon(pokemon.pokemonName);
                    setPokemon((previousState) => {
                      return {
                        ...previousState,
                        forceCapture: true,
                      };
                    });
                  }}
                >
                  Force Capture {pokemon.pokemonName}
                </button>
              </div>
              <div className="col-6">
                {pokemon.userWin && !pokemon.forceCapture ? (
                  // User Won
                  <div>
                    <h1>u won!</h1>
                    <button
                      className="btn btn-success w-50 mx-auto my-2"
                      onClick={getRandomOwnedPokemon}
                    >
                      Replay
                    </button>
                  </div>
                ) : (
                  // User Still Guessing
                  <div>
                    {pokemon.remainingGuesses > 0 ? (
                      <div className="container-fluid mt-5">
                        <h1>Pokeball ready!</h1>
                        <p>
                          Guess the hidden number to capture{" "}
                          {pokemon.pokemonName}
                        </p>
                        {pokemon.remainingGuesses > 0 ? (
                          <div>
                            <p>
                              You have {pokemon.remainingGuesses} guesses left!
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p>{pokemon.pokemonName} has ran away!</p>
                          </div>
                        )}
                        <form
                          onSubmit={(e) => onSubmitNumber(e)}
                          className="row"
                        >
                          <div className="form-group col-6">
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Guess between 1 - 10"
                              name="number"
                              onChange={(e) => onGuessChange(e)}
                              required
                              max={10}
                              min={1}
                            />
                          </div>
                          <button
                            className="btn btn-primary col-auto"
                            type="submit"
                          >
                            Guess
                          </button>
                        </form>
                      </div>
                    ) : (
                      // User Lost
                      <div>
                        <h1>you lost!</h1>
                        <button
                          className="btn btn-success w-50 mx-auto my-2"
                          onClick={getRandomOwnedPokemon}
                        >
                          Replay
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Hide Pokemon
            <div className="">
              <div
                className="pokemon-card back mx-auto"
                onClick={getRandomOwnedPokemon}
              >
                <img src={pokemons["pokeball"]} alt="pokeball" />
              </div>
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
