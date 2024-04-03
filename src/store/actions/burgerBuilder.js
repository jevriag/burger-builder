import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ( name ) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = ( name ) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ( ingredients ) => {
  return {
    type:  actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};
// to handle errors
export const fetchIngredientsFailed = () => {
  return {
    type:  actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

/* Fetching data from (ingredients which stored on Firebase.)
   initIngredients was created to load the ingredients which
   can be used in burgerBuilder */
export const initIngredients = ( ) => {
  return dispatch => {
    axios.get('https://my-burger-burger-fd244.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data));
    })
    .catch( error => {
      dispatch(fetchIngredientsFailed())
    });
  };
};
