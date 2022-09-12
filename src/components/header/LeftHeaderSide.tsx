import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";
import AdminOnly from "../authorization/AdminOnly";

const LeftHeaderSide = () => {
    const navigate = useNavigate();
    const currentCat = useAppSelector(state => state.viewing.itemManagement.currentCat);

    const addItemAndManageSectors = <>
        <span onClick={() => navigate('/itemmenu')}>+</span>
        <span onClick={() => navigate('/managesectors')}>⋮</span>
    </>;

    return (
        <Routes>
            <Route path="/" element={addItemAndManageSectors} />
            <Route path="items/*" element={<AdminOnly><span onClick={() => navigate(`itemmenu/${currentCat}`)}>ערוך</span></AdminOnly>} />
            <Route path="itemmenu" element={<></>} />
            <Route path="itemmenu/*" element={<></>} />
        </Routes>
    )
};

export default LeftHeaderSide;