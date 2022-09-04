import { Route, Routes, useNavigate } from "react-router-dom";

const RightHeaderSide = ({ loggedInAsAdmin }: { loggedInAsAdmin: boolean }) => {
    const navigate = useNavigate();

    const handleLogout = () => {

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