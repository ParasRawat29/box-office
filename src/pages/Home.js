import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [results, setresults] = useState(null);
  const [searchOption, setsearchOption] = useState('shows');

  const isShowSearch = searchOption === 'shows';
  console.log(searchOption);

  const onSearch = async () => {
    // apiGet(`search/shows?q=${input}`).then(res => {
    //   setresults(() => res);
    // });
    setresults(await apiGet(`search/${searchOption}?q=${input}`));
  };

  const Handleinput = e => {
    const val = e.target.value;
    setInput(() => val);
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
      return results[0].show
        ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }
    return null;
  };

  const onRadioChange = e => {
    setsearchOption(() => e.target.value);
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={Handleinput}
        value={input}
        placeholder="Seach Something"
        onKeyDown={HandleEnter}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>

      <div>
        <label htmlFor="show-search">
          Show
          <input
            id="show-search"
            type="radio"
            onChange={onRadioChange}
            value="shows"
            checked={isShowSearch}
          />
        </label>
        <label htmlFor="actor-search">
          Actor
          <input
            id="actor-search"
            type="radio"
            onChange={onRadioChange}
            value="people"
            checked={!isShowSearch}
          />
        </label>
      </div>
      {renderResult()}
    </MainPageLayout>
  );
}
export default Home;
