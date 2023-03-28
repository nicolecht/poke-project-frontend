import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { fetchUnownedPokemon } from "../actions/unownedpokemons";
import { addUserPokemon } from "../actions/addpokemon";
import { Link, useNavigate } from "react-router-dom";
import * as pokemons from "../assets/pokemons";
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const UserPokemon = ({ pokemonState, fetchUnownedPokemon, addUserPokemon }) => {
  let navigate = useNavigate();

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
    allCaptured: false,
  });

  const getRandomOwnedPokemon = () => {
    fetchUnownedPokemon(authState.user.username);
    if (unownedPokemons && unownedPokemons.length > 0) {
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
          allCaptured: false,
        };
      });
    } else {
      setPokemon((previousState) => {
        return {
          ...previousState,
          allCaptured: true,
        };
      });
    }
  };

  const forceCapturePokemon = (pokemonName) => {
    addUserPokemon(pokemonName);
    setPokemon((previousState) => {
      return {
        ...previousState,
        forceCapture: true,
      };
    });
  };

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

  const userGuessing = () => (
    <Fragment>
      <div className="container-fluid mt-3 text-center">
        <h1>Pokeball ready!</h1>
        <p>Guess the hidden number to capture {pokemon.pokemonName}</p>
        {pokemon.remainingGuesses > 0 ? (
          <div>
            <p>You have {pokemon.remainingGuesses} guesses left!</p>
          </div>
        ) : (
          <div>
            <p>{pokemon.pokemonName} has ran away!</p>
          </div>
        )}
        <form
          onSubmit={(e) => onSubmitNumber(e)}
          className="row justify-content-center"
        >
          <div className="form-group col-sm-6 mb-sm-0 mb-3">
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
          <button className="btn btn-success col-auto" type="submit">
            Guess
          </button>
        </form>
      </div>
      <div
        className="d-flex flex-column my-5 mx-auto"
        style={{ maxWidth: "350px" }}
      >
        <button
          className="btn btn-success my-2"
          onClick={getRandomOwnedPokemon}
        >
          {pokemon.remainingGuesses > 0 ? "Change Card" : "Replay"}
        </button>
        <button
          className="btn btn-success my-2"
          onClick={() => {
            forceCapturePokemon(pokemon.pokemonName);
          }}
        >
          Force Capture {pokemon.pokemonName}
        </button>
      </div>
    </Fragment>
  );

  const userWon = () => (
    <Fragment>
      <div className="container-fluid mt-3 text-center">
        <h1>{pokemon.pokemonName} was captured!</h1>
        <h5>{pokemon.pokemonName} has been added to your pokedex.</h5>
      </div>
      <div
        className="d-flex flex-column my-5 mx-auto"
        style={{ maxWidth: "350px" }}
      >
        <button
          className="btn btn-success my-2"
          onClick={getRandomOwnedPokemon}
        >
          Find new pokemon
        </button>
        <button
          className="btn btn-success my-2"
          onClick={() => {
            navigate("/pokedex");
          }}
        >
          View Pokedex
        </button>
      </div>
    </Fragment>
  );

  const userLost = () => (
    <Fragment>
      <div className="container-fluid mt-3 text-center">
        <h1>{pokemon.pokemonName} has ran away!</h1>
        <h5>Replay to catch a new pokemon?</h5>
      </div>
      <div
        className="d-flex flex-column my-5 mx-auto"
        style={{ maxWidth: "350px" }}
      >
        <button
          className="btn btn-success my-2"
          onClick={getRandomOwnedPokemon}
        >
          {pokemon.remainingGuesses > 0 ? "Change Card" : "Replay"}
        </button>
        <button
          className="btn btn-success my-2"
          onClick={() => {
            forceCapturePokemon(pokemon.pokemonName);
          }}
        >
          Force Capture {pokemon.pokemonName}
        </button>
      </div>
    </Fragment>
  );

  const userForceCapture = () => (
    <Fragment>
      <div className="container-fluid mt-3 text-center">
        <h1>{pokemon.pokemonName} was forcefully captured!</h1>
        <h5>Sad {pokemon.pokemonName} has been added to your pokedex.</h5>
      </div>
      <div
        className="d-flex flex-column my-5 mx-auto"
        style={{ maxWidth: "350px" }}
      >
        <button
          className="btn btn-success my-2"
          onClick={getRandomOwnedPokemon}
        >
          Find new pokemon
        </button>
        <button
          className="btn btn-success my-2"
          onClick={() => {
            navigate("/pokedex");
          }}
        >
          View Pokedex
        </button>
      </div>
    </Fragment>
  );

  return (
    <div className="container p-sm-5 p-2">
      {unownedPokemonsLoading ? (
        <Loading />
      ) : (
        <div>
          {!pokemon.allCaptured ? (
            <div>
              {pokemon.displayPokemon ? (
                // Display Pokemon
                <div className="row">
                  <div className="col-lg-6 d-flex flex-column">
                    <div className="mx-auto">
                      <div className="pokemon-card">
                        <img
                          src={pokemons[formatPokemonName(pokemon.pokemonName)]}
                          alt=""
                        />
                        <p>Name: {pokemon.pokemonName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex flex-column">
                    {!pokemon.forceCapture && (
                      <div>
                        {pokemon.userWin ? (
                          userWon()
                        ) : (
                          <div>
                            {pokemon.remainingGuesses > 0
                              ? userGuessing()
                              : userLost()}
                          </div>
                        )}
                      </div>
                    )}
                    {pokemon.forceCapture && userForceCapture()}
                  </div>
                </div>
              ) : (
                // Hide Pokemon
                <div
                  className="pokemon-card back mx-auto"
                  onClick={getRandomOwnedPokemon}
                >
                  <img src={pokemons["pokeball"]} alt="pokeball" />
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1>Can't find anymore wild pokemons ...</h1>
              <button
                className="btn btn-success my-2"
                onClick={() => {
                  navigate("/pokedex");
                }}
              >
                View Pokedex
              </button>
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
