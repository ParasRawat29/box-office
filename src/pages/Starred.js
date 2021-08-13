/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { useShows } from '../misc/Custom-hooks';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';

function Starred() {
  const [starred] = useShows();
  const [isloading, setLoading] = useState(true);
  const [err, seterr] = useState(null);
  const [shows, setShows] = useState(null);

  console.log(starred);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showid => apiGet(`shows/${showid}`));
      Promise.all(promises)
        .then(apires => apires.map(show => ({ show })))
        .then(res => {
          setShows(() => res);
          setLoading(false);
        })
        .catch(error => {
          seterr(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isloading && <div>Shows are Loading ...</div>}
      {err && <div>Error occured : {err}</div>}
      {!isloading && !shows && <div>NO Shows Added</div>}
      {!isloading && !err && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
}

export default Starred;
