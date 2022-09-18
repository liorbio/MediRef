import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { viewingActions } from "../../store/viewing-slice";
import AreYouSure from "../UI/AreYouSure";


const GoBack = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const changeDetected = useAppSelector(state => state.viewing.itemManagement.changesApplied);
    const [showAreYouSure, setShowAreYouSure] = useState(false);

    const handleGoBack = () => {
        if (changeDetected) {
            setShowAreYouSure(true);
        } else {
            navigate(-1);
        }
    }
    const goBackAnyway = () => {
        navigate(-1);
        setShowAreYouSure(false);
        dispatch(viewingActions.changesAppliedToItem(false));
        dispatch(viewingActions.changesAppliedToSector(false));
    }
    
    return (
        <>
            {showAreYouSure && <AreYouSure text='נדמה לנו שבוצעו שינויים. לצאת ללא שמירה?' leftText='צא' leftAction={goBackAnyway} rightText='הישאר' rightAction={() => setShowAreYouSure(false)} />}
            <span onClick={handleGoBack}>חזרה</span>
        </>
    )
};

export default GoBack;