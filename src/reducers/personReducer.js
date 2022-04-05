import * as TYPES from '../actions/types';

const personReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_PERSON:
      return { ...state, ...action.payload };
    case TYPES.FETCH_PERSON_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_PERSON_FINISHED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default personReducer;