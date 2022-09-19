import classes from './App.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { get } from 'idb-keyval';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux-hooks';
import { authActions } from './store/auth-slice';
import Header from './components/header/Header';
import ItemPage from './components/item-page/ItemPage';
import AdminOnly from './components/authorization/AdminOnly';
import HomePage from './components/item-search/HomePage';
import LoginPage from './components/login/LoginPage';
import ItemMenu from './components/item-menu/ItemMenu';
import SectorManagement from './components/sector-management/SectorManagement';
import SectorMenu from './components/sector-management/SectorMenu';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let autoLogoutTimer: NodeJS.Timeout;

    Promise.all([get('hanaref-jwt'), get('hanaref-front-end-privilege'), get('hanaref-jwt-expiry-date')])
      .then((values) => {
        if (values.every(v => !!v)) {
          const [jwt, frontEndPrivilege, jwtExpiryDate] = values;
          if (new Date().getTime() >= jwtExpiryDate) {
            dispatch(authActions.clearAuthStateUponLogout());
          } else {
            dispatch(authActions.consumeAuthStateFromIDB({ jwt: jwt, frontEndPrivilege: frontEndPrivilege, jwtExpiryDate: jwtExpiryDate }));
            autoLogoutTimer = setTimeout(() => {
              dispatch(authActions.clearAuthStateUponLogout());
            }, jwtExpiryDate - new Date().getTime());
          }
        }
      }).catch((err) => console.log(`Error consuming auth state from IDB: ${err}`));

    return () => {
      clearTimeout(autoLogoutTimer);
    }
  }, [dispatch]);

  return (
    <div className={classes.App}>
      <Header />
      <div className={classes.pushBodyDown}>
        <Routes>
          {/* Public Routes: */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/items/:itemid" element={<ItemPage />} />
          <Route path="/" element={<HomePage />} />
          {/* Protected Routes: */}
          <Route path="/itemmenu" element={<AdminOnly><ItemMenu /></AdminOnly>} />
          <Route path="/itemmenu/:itemid" element={<AdminOnly><ItemMenu /></AdminOnly>} />
          <Route path="/managesectors" element={<AdminOnly><SectorManagement /></AdminOnly>} />
          <Route path="/sectormenu" element={<AdminOnly><SectorMenu exit={() => navigate(-1)} /></AdminOnly>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
