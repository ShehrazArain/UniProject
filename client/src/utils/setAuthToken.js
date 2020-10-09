import axios from 'axios';

const setAuthToken = async token => {
  try {
    axios.defaults.headers.common['x-auth-token'] = token;
  } catch (err) {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken;