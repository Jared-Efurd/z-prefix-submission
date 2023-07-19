import './style/App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNewItem from './components/CreateNewItem';
import DetailedItemView from './components/DetailedItemView';
import Header from './components/Header';
import Inventory from './components/Inventory';
import Login from './components/Login';
import MyInventory from './components/MyInventory';
import SignUp from './components/SignUp';

export const UserContext = React.createContext();

function App() {
  const [ user, setUser ] = useState({
    id: 0,
    first_name: '',
    last_name: '',
    username: ''
  });

  return (
    <UserContext.Provider value={ {user, setUser} }>
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/my-inventory' element={<MyInventory />} />
          <Route path='/' element={<Inventory />} />
          <Route path='/create-new-item' element={<CreateNewItem />} />
          <Route path='/items/:itemId' element={<DetailedItemView />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
