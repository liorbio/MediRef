import { Route, Routes, useNavigate } from "react-router-dom";

const LeftHeaderSide = () => {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route path="/" element={<span onClick={() => navigate('/itemmenu')}>+</span>} />
        </Routes>
    )
};

export default LeftHeaderSide;