import React from 'react';
import { ActorCardStyled } from './ActorCardStyled';

const ActorCard = ({ img, name, gender, country, birthday, deathday }) => {
  return (
    <ActorCardStyled>
      <div className="img-wrapper">
        <img src={img} alt="actor" />
      </div>
      <h1>
        {name} {gender ? `(${gender})` : null}
      </h1>
      <p>{country ? `Comes from ${country}` : 'No country known'}</p>
      {birthday ? <p>Born {birthday}</p> : null}
      <p className="deathday">{deathday ? `Died ${deathday}` : 'Alive'}</p>
    </ActorCardStyled>
  );
};
export default ActorCard;
