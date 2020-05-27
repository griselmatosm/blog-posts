import getData from '../services/getDataFromApi';

//al usar redux-thunk en action creators asíncronos la función del fetch retorna otra función que recibe
//como parámatros dispatch y getState (en este caso no necesitamos el estado)
export const fetchPosts = () => async (dispatch) => {
  const response = await getData.get('/posts');
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await getData.get(`/user/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
};
