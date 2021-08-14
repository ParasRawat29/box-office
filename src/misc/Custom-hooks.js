import { useReducer, useEffect, useState, useRef, useCallback } from 'react';
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

  const setPersisted = useCallback(
    newState => {
      setInput(() => newState);
      // console.log(newState);
      sessionStorage.setItem(key, JSON.stringify(newState));
    },
    [key]
  );
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

export function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
