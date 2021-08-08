import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

function Home() {
  const [input, setInput] = useState('');

  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=hotel
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
      });
  };

  const Handleinput = e => {
    const val = e.target.value;
    setInput(() => val);
  };

  const HandleEnter = e => {
    if (e.keyCode === 13) onSearch();
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={Handleinput}
        value={input}
        onKeyDown={HandleEnter}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainPageLayout>
  );
}
export default Home;
