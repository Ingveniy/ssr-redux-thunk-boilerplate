import { INC_COUNTER, DEG_COUNTER } from '../types/counter';

const initialState = {
  counter: 0,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEG_COUNTER:
    case INC_COUNTER:
      return {
        ...state,
        counter: action.payload
      };

    default:
      return state;
  }
};
