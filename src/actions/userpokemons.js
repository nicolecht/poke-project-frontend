import axios from 'axios';

export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';

export const fetchPokemonRequest = () => {
  return {
    type: FETCH_POKEMON_REQUEST
  };
};

export const fetchPokemonSuccess = (pokemon) => {
  return {
    type: FETCH_POKEMON_SUCCESS,
    payload: pokemon
  };
};

export const fetchPokemonFailure = (error) => {
  return {
    type: FETCH_POKEMON_FAILURE,
    payload: error
  };
};

// export const fetchUserPokemon = (username) => {
//   return (dispatch) => {
//     dispatch(fetchPokemonRequest());

// 	const config = {
// 		headers: {
// 		  "Content-Type": "application/json",
// 		  Authorization: `JWT ${localStorage.getItem("access")}`,
// 		  Accept: "application/json",
// 		},
// 	  };

//     axios.get(`http://127.0.0.1:8000/pokemon/api/user-pokemon/${username}`, config)
//       .then((response) => {
//         const pokemon = response.data;
//         dispatch(fetchPokemonSuccess(pokemon));
//       })
//       .catch((error) => {
//         dispatch(fetchPokemonFailure(error.message));
//       });
//   };
// };

export const fetchUserPokemon = (username) => async (dispatch) => {
	dispatch({ type: FETCH_POKEMON_REQUEST });

	const config = {
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `JWT ${localStorage.getItem("access")}`,
		  Accept: "application/json",
		},
	  };
  
	try {
	  const response = await axios.get(`http://127.0.0.1:8000/pokemon/api/user-pokemon/${username}`, config);
	  const pokemon = response.data;
	  dispatch({
		type: FETCH_POKEMON_SUCCESS,
		payload: pokemon
	  });
	} catch (error) {
	  dispatch({
		type: FETCH_POKEMON_FAILURE,
		payload: error.message
	  });
	}
  };
