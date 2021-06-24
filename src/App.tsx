import firebase from 'firebase';
import { createContext, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import { auth } from './services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (response.user) {
      const { displayName, photoURL, uid } = response.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
