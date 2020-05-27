import _ from 'lodash';
import getData from '../services/getDataFromApi';

//al usar redux-thunk en action creators asíncronos la función del fetch retorna otra función que recibe
//como parámatros dispatch y getState (en este caso no necesitamos el estado)
export const fetchPosts = () => async (dispatch) => {
  const response = await getData.get('/posts');
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

//la función memoize de la librería lodash  permite que una función 
//pura cuente con un mecanismo en el que pueda recordar valores ya 
//computados para ahorrar recursos y tiempos.
//La idea es envolver una función en un mecanismo de caché, sin que 
//el comportamiento de dicha función se vea alterado.

//de esta manera evitamos que se realicen peticiones innecesarias cada vez
//que el id sea el mismo, es decir, realiza la petición una vez, para cada
//id diferente y cuando detecta que hay un id que matchea devuelve el mismo resultado
//pues recuerda los valores retornados cuando el  id coincide

const _fetchUser = _.memoize(async (id, dispatch) => { //se suele poner _ delante del nombre de la función para indicar que es privada
  const response = await getData.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
});
