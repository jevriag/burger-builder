export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

/* in react there is no any validation package,It have to be done on your own */
export const checkValidity = (value, rules) => {
    let isValid = true;
// the trim() method removes whitespace from both ends of a string.
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
      const pattern = /\S+@\S+\.\S+/;
      isValid = isValid && pattern.test(value);
  }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }
