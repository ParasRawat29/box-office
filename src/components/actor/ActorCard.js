import React from 'react';

const ActorCard = ({ img, name, gender, country, birthday, deathday }) => {
  return (
    <>
      <div className="img-wrapper">
        <img src={img} alt="actor" />
      </div>
      <h1>
        {name} {gender ? `(${gender})` : null}
      </h1>
      <p>{country ? `Comes from ${country}` : 'No country known'}</p>
      {birthday ? <p>Born {birthday}</p> : null}
      <p className="deathday">{deathday ? `Died ${deathday}` : 'Alive'}</p>
    </>
  );
};
export default ActorCard;
