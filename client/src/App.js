import './style/App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNewItem from './components/CreateNewItem';
import DetailedItemView from './components/DetailItemView';
import Header from './components/Header';
import Inventory from './components/Inventory';
import Login from './components/Login';
import MyInventory from './components/MyInventory';
import SignUp from './components/SignUp';

export const UserContext = React.createContext();

function App() {
  const [ userId, setUserId ] = useState(-1);

  return (
    <UserContext.Provider value={ {userId, setUserId} }>
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/my-inventory' element={<MyInventory />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/create-new-item' element={<CreateNewItem />} />
          <Route path='/item/:itemId' element={<DetailedItemView />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
