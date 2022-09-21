import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { authActions } from "../../store/auth-slice";
import AreYouSure from "../UI/AreYouSure";
import GoBack from "./GoBack";

const RightHeaderSide = ({ loggedIn }: { loggedIn: boolean }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [areYouSureLogout, setAreYouSureLogout] = useState(false);

    const handleLogout = () => {
        dispatch(authActions.clearAuthStateUponLogout());
        navigate(0);
    };

    const signInOut = loggedIn ? <span onClick={() => setAreYouSureLogout(true)}>יציאה</span> : <span onClick={() => navigate('/login')}>כניסה</span>;

    return (
        <>
            <Routes>
                    {
                        ["/login", "/itemmenu", "/itemmenu/*", "/items/*", "/managesectors", "/sectormenu"].map(path => <Route path={path} element={<GoBack />} key={path} />)
                    }
                    <Route path="/itemnotfound/*" element={<GoBack goHome={true} />} />
                    <Route path="/" element={signInOut} />
            </Routes>
            {areYouSureLogout && <AreYouSure text="לצאת מהמשתמש?" leftText="צא" leftAction={handleLogout} rightText="לא" rightAction={() => setAreYouSureLogout(false)} />}
        </>
    )
};

export default RightHeaderSide;