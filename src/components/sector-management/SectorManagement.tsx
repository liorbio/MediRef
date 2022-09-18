import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Sector } from "../../types/sector_types";
import classes from './SectorManagement.module.css';
import SectorMenu from "./SectorMenu";

const SectorManagement = () => {
    const navigate = useNavigate();
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [selectedSectorToEdit, setSelectedSectorToEdit] = useState<Sector | null>(null);
    const authToken = useAppSelector(state => state.auth.jwt);
    const [triggerReload, setTriggerReload] = useState(false);

    // 1. add an onClick to sector div which opens the selectedSectorToEdit
    // 1.5. Get entire sectors and not just the names (edit the "then" in the fetch)
    // 2. navigate to sector menu that comes without a sector prop upon pressing the + button
    // 3. use the viewingSlice to trigger Are You Sure when editing

    useEffect(() => {
        fetch(`/sectors`, {
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => res.json())
            .then((res: Sector[]) => {
                setSectors(res);
            })
            .catch((err) => console.log(`Error fetching sectors: ${err}`))
    }, [authToken, triggerReload]);
    
    const exitOutOfSectorEditMenu = () => {
        setSelectedSectorToEdit(null);
    }
    const reload = () => {
        setTriggerReload(prev => !prev);
    }

    return (
        <>
        {selectedSectorToEdit && <SectorMenu sector={selectedSectorToEdit} exit={exitOutOfSectorEditMenu} reload={reload} />}
        {!selectedSectorToEdit &&
            <div className={classes.wrapper}>
                <h1>עריכת מדורים</h1>
                {sectors.map(s => <div className={classes.sectorButton} key={s.sectorName} onClick={() => setSelectedSectorToEdit(s)}>{s.sectorName}</div>)}
                <div className={classes.plusButton} onClick={() => navigate('/sectormenu')}>+</div>
            </div>
        }
        </>
    )
};

export default SectorManagement;