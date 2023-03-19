import axios from 'axios';

export const FETCH_ALL_POKEMON_REQUEST = 'FETCH_ALL_POKEMON_REQUEST';
export const FETCH_ALL_POKEMON_SUCCESS = 'FETCH_ALL_POKEMON_SUCCESS';
export const FETCH_ALL_POKEMON_FAILURE = 'FETCH_ALL_POKEMON_FAILURE';

export const fetchAllPokemon = () => async (dispatch) => {
	dispatch({ type: FETCH_ALL_POKEMON_REQUEST });

	const config = {
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `JWT ${localStorage.getItem("access")}`,
		  Accept: "application/json",
		},
	  };
  
	try {
	  const response = await axios.get(`http://127.0.0.1:8000/pokemon/pokemon/allpokemon`, config);
	  const pokemon = response.data;
	  dispatch({
		type: FETCH_ALL_POKEMON_SUCCESS,
		payload: pokemon
	  });
	} catch (error) {
	  dispatch({
		type: FETCH_ALL_POKEMON_FAILURE,
		payload: error.message
	  });
	}
  };
