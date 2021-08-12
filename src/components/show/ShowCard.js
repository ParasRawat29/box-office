import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from '../Styled';
import { ShowCardStyled } from './ShowCardStyled';

const ShowCard = ({ id, name, img, summary, starClick, isStarred }) => {
  const summaryAsText = summary
    ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')}...`
    : 'No description';
  return (
    <ShowCardStyled>
      <div className="img-wrapper">
        <img src={img} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div className="btns">
        <Link to={`/show/${id}`}>Read more</Link>
        <button type="button" onClick={starClick}>
          <Star active={isStarred} />
        </button>
      </div>
    </ShowCardStyled>
  );
};

export default ShowCard;
