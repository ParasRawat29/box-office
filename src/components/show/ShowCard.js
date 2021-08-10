import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = ({ id, name, img, summary }) => {
  const summaryAsText = summary
    ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')}...`
    : 'No description';
  return (
    <>
      <div className="img-wrapper">
        <img src={img} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div className="btns">
        <Link to={`/show/${id}`}>Read more</Link>
        <button type="button">Star me</button>
      </div>
    </>
  );
};

export default ShowCard;
