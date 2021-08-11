import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

function Show() {
  // shows/1123?embed[]=seasons&embed[]=cast
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    let ismounted = true;

    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(res => {
        if (ismounted) {
          setResult(() => res);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (ismounted) {
          setErrMessage(() => err);
          setIsLoading(false);
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
