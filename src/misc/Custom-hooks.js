import { useReducer, useEffect, useState } from 'react';
import { apiGet } from './config';

function showsReducer(prevstate, action) {
  switch (action.type) {
    case 'ADD':
      return [...prevstate, action.showid];
    case 'REMOVE':
      return prevstate.filter(id => id !== action.showid);
    default:
      return prevstate;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : '';
  });

  const setPersisted = newState => {
    setInput(() => newState);
    // console.log(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersisted];
}

function showreducer(prevState, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        result: action.show,
        isLoading: false,
        errMessage: null,
      };
    case 'FETCH_FAILED':
      return {
        result: null,
        isLoading: false,
        errMessage: action.error,
      };

    default:
      return prevState;
  }
}

export function useShow(showId) {
  const [state, dispatch] = useReducer(showreducer, {
    result: null,
    isLoading: true,
    errMessage: null,
  });

  useEffect(() => {
    let ismounted = true;

    apiGet(`shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(res => {
        if (ismounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: res });
          // setResult(() => res);
          // setIsLoading(false);
        }
      })
      .catch(err => {
        if (ismounted) {
          dispatch({ type: 'FETCH_FAILED', error: err });
          // setErrMessage(() => err);
          // setIsLoading(false);
        }
      });

    return () => {
      ismounted = false;
    };
  }, [showId]);
  return state;
}
