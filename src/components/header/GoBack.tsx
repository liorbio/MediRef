import ReactDOM from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { portalElement } from "../../elements/portalElement";
import { useAppSelector } from "../../hooks/redux-hooks";
import WarningModal from "../UI/WarningModal";


const GoBack = () => {
    const navigate = useNavigate();
    const changeDetected = useAppSelector(state => state.viewing.itemManagement.changesApplied);
    const [warningModalShown, setWarningModalShown] = useState(false);

    const handleGoBack = () => {
        if (changeDetected) {
            setWarningModalShown(true);
        } else {
            navigate("/");
        }
    }
    
    return (
        <>
            {warningModalShown && ReactDOM.createPortal(<WarningModal text="בוצעו שינויים! לצאת ללא שמירה?" action={() => navigate("/")} exit={() => setWarningModalShown(false)} />, portalElement)}
            <span onClick={handleGoBack}>חזרה</span>
        </>
    )
};

export default GoBack;