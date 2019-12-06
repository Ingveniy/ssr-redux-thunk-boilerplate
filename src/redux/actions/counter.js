import { incCounter, degCounter } from '../actionCreators/counter';

const handleIncCounter = api => counterValue => dispatch => {
  dispatch(incCounter(counterValue + 1));
};
const handleDegCounter = api => counterValue => dispatch => {
  dispatch(degCounter(counterValue - 1));
};

export { handleIncCounter, handleDegCounter };
