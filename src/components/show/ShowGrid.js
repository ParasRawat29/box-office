import React from 'react';
import notFoundPng from '../../images/not-found.png';
import ShowCard from './ShowCard';

function ShowGrid({ data }) {
  return (
    <div>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          img={show.image ? show.image.medium : notFoundPng}
          summary={show.summary}
        />
      ))}
    </div>
  );
}

export default ShowGrid;
