import { Route, Routes, useNavigate } from "react-router-dom";

const RightHeaderSide = ({ loggedIn }: { loggedIn: boolean }) => {
    const navigate = useNavigate();

    const handleLogout = () => {

    };

    const signInOut = loggedIn ? <span onClick={handleLogout}>יציאה</span> : <span onClick={() => navigate('/login')}>כניסה</span>;
    const goBack = <span onClick={() => navigate(-1)}>חזרה</span>;

    return (
        <Routes>
                {
                    ["/login", "/itemmenu", "/items"].map(path => <Route path={path} element={goBack} />)
                }
                <Route path="/" element={signInOut} />
        </Routes>
    )
};

export default RightHeaderSide;