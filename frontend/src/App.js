import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BoardPage from './components/board';
import Post from './components/board/Post';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={BoardPage} />
        <Route path='/post/:no' exact component={Post} />
      </Switch>
    </Router>
  );
};

export default App;
