import { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
    {/ Englobar o contexto para ter o context do usuario durante todas páginas. /}
      <AuthContextProvider>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
