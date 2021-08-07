import React from 'react';
import { Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Switch>
      <Route exact path="/">
        I am home page
      </Route>
      <Route exact path="/starred">
        I am starred page
      </Route>
      <Route>I AM 404 page</Route>
    </Switch>
  );
}

export default App;
