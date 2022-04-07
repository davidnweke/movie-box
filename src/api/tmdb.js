import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_THEMOVIEDB_BASEURL,
  params: {
    api_key: process.env.REACT_APP_THEMOVIEDB_API_KEY
  },
});
