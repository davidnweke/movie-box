import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key:"d5b46d6212531465a277aaa96e9c8a94"
  },
});
