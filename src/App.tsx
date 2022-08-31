import './App.css';
import { Routes, Route } from 'react-router-dom';
import { get } from 'idb-keyval';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux-hooks';
import { authActions } from './store/auth-slice';
import Header from './components/header/Header';
import ItemPage from './components/item-page/ItemPage';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    get('jwt').then((val) => {
      if (val) dispatch(authActions.consumeJwtFromIDB(val));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Public Routes: */}
        <Route path="/" element={<></>} />
        <Route path="/login" element={<></>} />
        <Route path="/items/:itemid" element={<ItemPage />} />

        {/* Protected Routes: */}
        <Route path="/itemmenu" element={<></>} />
        <Route path="/itemmenu/:itemid" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
