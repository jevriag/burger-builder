import React from 'react';
import classes from './Input.css';

const input = (props) => {

  let inputElement = null;
  // adding validation feedback
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  /* To react to user input and to get the user input.
    we type sth we want to use what we type as a new name,
    we can listen to a special event onChange and
    will be fired whenever the value in current input changes */

  switch ( props.elementType ) {
    case ( 'input' ):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
       />;
      break;
    case ( 'textarea' ):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
      break;
    case ( 'select' ):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
        {props.elementConfig.options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.displayValue}
          </option>
        ))}
        </select>
      );
        break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
       />;
  }

  let validationError = null;
  if (props.invalid && props.touched) {
      validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
      if (props.elementConfig.type === 'password') {
          validationError = (
              <p className={classes.ValidationError}>
                  Password must be 6 characters minimum!
              </p>
          )
      }
  }

  return (
    <div className={classes.Input}>
      <label
        className={classes.Label}
      >
        {props.label}
      </label>
      {inputElement}
      {validationError}
    </div>
  )
}

export default input;
