import React from 'react';
import notFoundPng from '../../images/not-found.png';
import ShowCard from './ShowCard';
import { FlexGrid } from '../Styled';

function ShowGrid({ data }) {
  return (
    <FlexGrid>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          img={show.image ? show.image.medium : notFoundPng}
          summary={show.summary}
        />
      ))}
    </FlexGrid>
  );
}

export default ShowGrid;
