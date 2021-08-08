import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [results, setresults] = useState(null);

  const onSearch = async () => {
    // apiGet(`search/shows?q=${input}`).then(res => {
    //   setresults(() => res);
    // });
    setresults(await apiGet(`search/shows?q=${input}`));
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
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
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
      {renderResult()}
    </MainPageLayout>
  );
}
export default Home;
