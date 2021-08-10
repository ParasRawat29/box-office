import React from 'react';
import notFoundPng from '../../images/not-found.png';
import { FlexGrid } from '../Styled';
import ActorCard from './ActorCard';

function ActorGrid({ data }) {
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCard
          id={person.id}
          name={person.name}
          country={person.country ? person.country.name : null}
          birthday={person.birthday}
          deathday={person.deathday}
          gender={person.gender}
          img={person.image ? person.image.medium : notFoundPng}
        />
      ))}
    </FlexGrid>
  );
}

export default ActorGrid;
