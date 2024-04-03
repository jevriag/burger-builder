/*  Central Store stores the entire application state
   Redux - third party library which works totally independent of React
   Central Store
   Component wants to manipulate or to get the current app state but it
   doesnt do that by manipulating the central JS object.Predictable process of
   updating the state:
   The first building block beside the Central Store are ACTIONS within the
   components which are dispatched from the JS code in the React app. Action
   is an information package we are sending out to the Redux, which doesnt
   hold any logic, doesnt knoq how to update the store
   The thing changing the store is a REDUCER .The reducer ia a pure function
   which receives the action and the old state as an input reducer in the end
   is just a pure function which receives the action and the old state as input.
   The important thing is that the reducer has to execute synchronous code only,
   no asynchronous code, no side effects, no HTTP requests.
   Subscription model is used to get the updated state back into the component.
   The store triggers all subscriptions whenever the state changes, whenever the
  state is updated in the store. Component can subscribe to store updates and it
  then receives that update automatically.
  Middlware is a piece of code, specifically a function. By adding the moddleware
  action will reach the reducer. With that action before it reaches the reducer
  that cab be simply logging sth */

export {
  addIngredient,
  removeIngredient,
  initIngredients
} from './burgerBuilder';

export {
  purchaseBurger,
  purchaseInit,
  fetchOrders
} from './order';

export {
  auth,
  logout,
  setAuthRedirectPath,
  authCheckState
} from './auth';
