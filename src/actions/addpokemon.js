import axios from "axios";

export const ADD_POKEMON_REQUEST = "ADD_POKEMON_REQUEST";
export const ADD_POKEMON_SUCCESS = "ADD_POKEMON_SUCCESS";
export const ADD_POKEMON_FAILURE = "ADD_POKEMON_FAILURE";

export const addUserPokemon = (pokemon_name) => async (dispatch) => {
  dispatch({ type: ADD_POKEMON_REQUEST });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  const body = JSON.stringify({ name: pokemon_name });

  try {
    console.log(config);
    console.log(body);
    const response = await axios.post(
      `http://127.0.0.1:8000/pokemon/pokemon/addpokemon/`,
      body,
      config
    );
    const pokemon = response.data;
    dispatch({
      type: ADD_POKEMON_SUCCESS,
      payload: pokemon,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_POKEMON_FAILURE,
      payload: error.message,
    });
  }
};
