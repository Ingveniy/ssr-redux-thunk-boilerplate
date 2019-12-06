import { INC_COUNTER, DEG_COUNTER } from '../types/counter';

const incCounter = counter => {
  return { type: 'INC_COUNTER', payload: counter };
};

const degCounter = counter => {
  return { type: 'DEG_COUNTER', payload: counter };
};

export { incCounter, degCounter };
