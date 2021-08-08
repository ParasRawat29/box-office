import React from 'react';
import Nav from './Nav';
import Title from './Title';

function MainPageLayout({ children }) {
  return (
    <div>
      <Title title="BOX-OFFICE" subtitle="Looking for Movies Or Actors" />
      <Nav />
      {children}
    </div>
  );
}

export default MainPageLayout;
