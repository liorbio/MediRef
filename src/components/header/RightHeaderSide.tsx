import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { authActions } from "../../store/auth-slice";
import GoBack from "./GoBack";

const RightHeaderSide = ({ loggedInAsAdmin }: { loggedInAsAdmin: boolean }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(authActions.clearJwt());
        dispatch(authActions.clearFrontEndPrivilege());
    };

    const signInOut = loggedInAsAdmin ? <span onClick={handleLogout}>יציאה</span> : <span onClick={() => navigate('/login')}>כניסה</span>;

    return (
        <Routes>
                {
                    ["/login", "/itemmenu", "/itemmenu/*", "/items/*", "/managesectors", "/sectormenu"].map(path => <Route path={path} element={<GoBack />} key={path} />)
                }
                <Route path="/" element={signInOut} />
        </Routes>
    )
};

export default RightHeaderSide;