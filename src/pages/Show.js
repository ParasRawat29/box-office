import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

function Show() {
  // shows/1123?embed[]=seasons&embed[]=cast
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`).then(res => {
      setResult(() => res);
    });
    return () => {};
  }, [id]);

  console.log(id);
  console.log(result);
  return <div>I am show page</div>;
}

export default Show;
