import { Route, Routes, useNavigate } from "react-router-dom";

const LeftHeaderSide = () => {
    const navigate = useNavigate();

    const addItemAndManageSectors = <>
        <span onClick={() => navigate('/itemmenu')}>+</span>
        <span onClick={() => navigate('/managesectors')}>⋮</span>
    </>;

    return (
        <Routes>
            <Route path="/" element={addItemAndManageSectors} />
        </Routes>
    )
};

export default LeftHeaderSide;