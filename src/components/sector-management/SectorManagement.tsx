import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Sector } from "../../types/sector_types";
import classes from './SectorManagement.module.css';
import SectorMenu from "./SectorMenu";

const SectorManagement = () => {
    const [sectors, setSectors] = useState<string[]>([]);
    const [selectedSectorToEdit, setSelectedSectorToEdit] = useState<Sector | null>(null);
    const authToken = useAppSelector(state => state.auth.jwt);

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
                const output = res.map(s => s.sectorName);
                setSectors(output);
            })
            .catch((err) => console.log(`Error fetching sectors: ${err}`))
    }, [authToken]);
    return (
        <>
        {selectedSectorToEdit && <SectorMenu sector={selectedSectorToEdit} />}
        <div className={classes.wrapper}>
            <h1>עריכת מדורים</h1>
            {sectors.map(s => <div className={classes.sectorButton} key={s}>{s}</div>)}
            <div className={classes.plusButton}>+</div>
        </div>
        </>
    )
};

export default SectorManagement;