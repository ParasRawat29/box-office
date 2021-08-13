import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import CustomRadio from '../components/show/CustomRadio';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/Custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

function Home() {
  const [input, setInput] = useLastQuery();
  const [results, setresults] = useState(null);
  const [searchOption, setsearchOption] = useState('shows');

  const isShowSearch = searchOption === 'shows';

  const onSearch = async () => {
    // apiGet(`search/shows?q=${input}`).then(res => {
    //   setresults(() => res);
    // });
    setresults(await apiGet(`search/${searchOption}?q=${input}`));
  };

  const Handleinput = e => {
    const val = e.target.value;
    setInput(val);
  };

  const HandleEnter = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const renderResult = () => {
    if (results && results.length === 0) {
      return <div>No result Found</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  const onRadioChange = e => {
    setsearchOption(() => e.target.value);
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={Handleinput}
        value={input}
        placeholder="Seach Something"
        onKeyDown={HandleEnter}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="show-search"
            onChange={onRadioChange}
            value="shows"
            checked={isShowSearch}
          />
        </div>
        <div>
          <CustomRadio
            label="Actor"
            id="actor-search"
            type="radio"
            onChange={onRadioChange}
            value="people"
            checked={!isShowSearch}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResult()}
    </MainPageLayout>
  );
}
export default Home;
