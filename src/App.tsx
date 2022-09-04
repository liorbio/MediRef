import classes from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import { get } from 'idb-keyval';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux-hooks';
import { authActions } from './store/auth-slice';
import Header from './components/header/Header';
import ItemPage from './components/item-page/ItemPage';
import AdminOnly from './components/authorization/AdminOnly';
import HomePage from './components/item-search/HomePage';
import LoginPage from './components/login/LoginPage';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    get('jwt').then((val) => {
      if (val) dispatch(authActions.consumeJwtFromIDB(val));
    });
    get('front-end-privilege').then((val) => {
      if (val) dispatch(authActions.consumeFrontEndPrivilegeFromIDB(val));
    });
  }, [dispatch]);

  return (
    <div className={classes.App}>
      <Header />
      <div className={classes.pushBodyDown}>
        <Routes>
          {/* Public Routes: */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/items/:itemid" element={<ItemPage />} />

          {/* Protected Routes: */}
          <Route path="/itemmenu" element={<AdminOnly><></></AdminOnly>} />
          <Route path="/itemmenu/:itemid" element={<AdminOnly><></></AdminOnly>} />
          <Route path="/managesectors" element={<AdminOnly><></></AdminOnly>} />
          <Route path="/sectormenu" element={<AdminOnly><></></AdminOnly>} />
          <Route path="/sectormenu/:sectorname" element={<AdminOnly><></></AdminOnly>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
