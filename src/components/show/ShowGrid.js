/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import notFoundPng from '../../images/not-found.png';
import ShowCard from './ShowCard';
import { FlexGrid } from '../Styled';
import { useShows } from '../../misc/Custom-hooks';

function ShowGrid({ data }) {
  const [starredshows, dispatchStarred] = useShows();

  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredshows.includes(show.id);

        const starClick = () => {
          if (isStarred) {
            dispatchStarred({ type: 'REMOVE', showid: show.id });
          } else {
            dispatchStarred({ type: 'ADD', showid: show.id });
          }
        };

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            img={show.image ? show.image.medium : notFoundPng}
            summary={show.summary}
            starClick={starClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
}

export default ShowGrid;
