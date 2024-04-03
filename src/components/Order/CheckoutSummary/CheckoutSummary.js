import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

// <Burger ingredients={props.ingredients}/>  to recieve ingredients property
const checkoutSummary = ( props ) => {
  
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button
         btnType='Danger'
         backdropClicked={props.checkoutCancelled}
      >
        CANCEL
      </Button>
      <Button
        btnType='Success'
        backdropClicked={props.checkoutContinued}
      >
        CONTINUE
      </Button>
    </div>
  );
}

export default checkoutSummary;
