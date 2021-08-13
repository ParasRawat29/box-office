/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { useShow } from '../misc/Custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

function Show() {
  const { id } = useParams();
  const { result, isLoading, errMessage } = useShow(id);
  console.log(result);

  if (isLoading) {
    return <div>LOADING ...</div>;
  }
  if (errMessage) {
    return <div>OOPS Error Occured</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        img={result.image}
        name={result.name}
        tags={result.genres}
        summary={result.summary}
        rating={result.rating}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={result.status}
          network={result.network}
          premiered={result.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={result._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={result._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
}

export default Show;
