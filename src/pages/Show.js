import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

const initState = {
  result: null,
  isLoading: true,
  errMessage: null,
};

function reducer(prevState, action) {
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

function Show() {
  // shows/1123?embed[]=seasons&embed[]=cast
  const { id } = useParams();
  // const [result, setResult] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [errMessage, setErrMessage] = useState(null);

  const [{ result, isLoading, errMessage }, dispatch] = useReducer(
    reducer,
    initState
  );

  useEffect(() => {
    let ismounted = true;

    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`)
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
  }, [id]);

  console.log(result);

  if (isLoading) {
    return <div>LOADING ...</div>;
  }
  if (errMessage) {
    return <div>OOPS Error Occured</div>;
  }
  return <div>I am show page </div>;
}

export default Show;
