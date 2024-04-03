import axios from 'axios';

/* There are various ways of adding Axios to the application:
    - import it and potentially set up some defaults
    - we added axios instance
   I am gonna use axios for all the order related stuff. Setting
   up baseURL to the path where baseURL has been copied from Firebase
   This is URL where i want to send my request to store my data in database  */

const instance = axios.create({
  baseURL: 'https://my-burger-burger-fd244.firebaseio.com/'
});

export default instance;

// Firebase :  send HTTP reuqest to endpoint (URL copied from Firebase)
