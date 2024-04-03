import React, { Component, Fragment } from 'react';
// Connecting BurgerBuilder container to Store
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {

  state  = {
      purchasing: false,
  }
    // Fetching data from (ingredients which stored on Firebase.)
    componentDidMount () {
      // console.log(this.props);
      this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
      if (this.props.isAuthenticated) {
        this.setState({ purchasing: true });
      } else {
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
      }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
      this.props.onInitPurchase();

   /*   An implemintation of the logic to pass the real ingredients which was picked
        on the checkout container .Encoding the ingredients where encodeURIComponent
        just encodes elements. I am using the property name which I dont need to encode
        because they are non-critical elements.
        = sign is query
        const queryParams = [];
        for (let i in this.state.ingredients) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        Because the totalPrice is only calculated and stored in the burgerBuilder.
        The totalPrice have to passed along with the ingredients from the burgerBuilder
        to the checkout components
        queryParams.push('price=' + this.state.totalPrice);
        query parametrs has & sinm ?????
        const queryString = queryParams.join('&'); */

        this.props.history.push('/checkout');
    }
        /*  pathname: 'checkout',
            search: '?' + queryString
            }); */

    render () {
      const disabledInfo = {
          ...this.props.ings
      };

      for (let key in disabledInfo) {
          disabledInfo[key] = disabledInfo[key] <= 0
      }
      // Logic for Spinner
      let orderSummary = null;

  /*   Error message: if we have the error equal to true then to show a paragraph
       where ingredients can't be loaded (showing a spinner instead of the burger
       whilst the user is waiting) */

      let burger = this.props.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;

      if (this.props.ings) {
          burger =  (
            <Fragment>
              <Burger ingredients={this.props.ings} />
              <BuildControls
                  ingredientAdded={this.props.onIngredientAdded}
                  ingredientRemoved={this.props.onIngredientRemoved}
                  disabled={disabledInfo}
                  purchasable={this.updatePurchaseState(this.props.ings)}
                  ordered={this.purchaseHandler}
                  isAuth={this.props.isAuthenticated}
                  price={this.props.price}
              />
            </Fragment>
          );

      /*  Because initially 'ingredients' is null, you fetch data when it loads, so part
          of the UI which depends on the  data will fail. Its preventable by checking if
          have ingredients before rendering anything which depends on ingredients */

          orderSummary =
            // Logic for Spinner
            <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }

        if (this.state.loading) {
          orderSummary = <Spinner />;
        }

        return (
          // Spinner inside the modal {orderSummary}
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                  {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

/*  Connecting BurgerBuilder container to Store. Let's simply
    wrap the mapDispatchToProps and mapStateToProps const */

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {

/* In the reducer.js ADD_INGREDIENT and REMOVE_INGREDIENT requires a payload(data).
   we need to pass the ingredientName along with the type. it is important */

    onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
    onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

// You can have as many hoc as you want.
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
