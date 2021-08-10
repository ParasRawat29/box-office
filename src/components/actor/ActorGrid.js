import React from 'react';
import notFoundPng from '../../images/not-found.png';
import ActorCard from './ActorCard';

function ActorGrid({ data }) {
  return data.map(({ person }) => (
    <ActorCard
      id={person.id}
      name={person.name}
      country={person.country ? person.country.name : null}
      birthday={person.birthday}
      deathday={person.deathday}
      gender={person.gender}
      img={person.image ? person.image.medium : notFoundPng}
    />
  ));
}

export default ActorGrid;
