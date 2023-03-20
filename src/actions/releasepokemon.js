import axios from "axios";

export const RELEASE_POKEMON_REQUEST = "RELEASE_POKEMON_REQUEST";
export const RELEASE_POKEMON_SUCCESS = "RELEASE_POKEMON_SUCCESS";
export const RELEASE_POKEMON_FAILURE = "RELEASE_POKEMON_FAILURE";

export const releaseUserPokemon = (pokemon_name) => async (dispatch) => {
  dispatch({ type: RELEASE_POKEMON_REQUEST });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  const body = JSON.stringify({ name: pokemon_name });

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/pokemon/pokemon/releasepokemon/`,
      body,
	  config
    );
    const pokemon = response.data;
    dispatch({
      type: RELEASE_POKEMON_SUCCESS,
      payload: pokemon,
    });
  } catch (error) {
    console.error(error); // Print the error message
    dispatch({
      type: RELEASE_POKEMON_FAILURE,
      payload: error.message,
    });
  }
};
