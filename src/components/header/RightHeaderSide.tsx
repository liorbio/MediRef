import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { authActions } from "../../store/auth-slice";

const RightHeaderSide = ({ loggedInAsAdmin }: { loggedInAsAdmin: boolean }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(authActions.clearJwt());
        dispatch(authActions.clearFrontEndPrivilege());
    };

    const signInOut = loggedInAsAdmin ? <span onClick={handleLogout}>יציאה</span> : <span onClick={() => navigate('/login')}>כניסה</span>;
    const goBack = <span onClick={() => navigate(-1)}>חזרה</span>;

    return (
        <Routes>
                {
                    ["/login", "/itemmenu", "/items", "/managesectors", "/sectormenu"].map(path => <Route path={path} element={goBack} key={path} />)
                }
                <Route path="/" element={signInOut} />
        </Routes>
    )
};

export default RightHeaderSide;