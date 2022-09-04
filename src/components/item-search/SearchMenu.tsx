import { useEffect, useState } from "react";
import { Sector } from "../../types/sector_types";
import DebouncingSearchBar from "./DebouncingSearchBar";
import DepartmentSelection from "./DepartmentSelection";
import SectorSelection from "./SectorSelection";
import classes from './HomePage.module.css';
import { useAppSelector } from "../../hooks/redux-hooks";

const SearchMenu = () => {
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [selectedSector, setSelectedSector] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const authToken = useAppSelector(state => state.auth.jwt);

    useEffect(() => {
        // FETCH SECTORS FROM API + use setSectors on them.
        fetch(`/sectors`, {
            headers: authToken ? {
                'auth-token': authToken
            } : {}
        }).then((res) => res.json()).then((res) => {
            setSectors(res);
        });
    }, [authToken]);

    const handleSetSector = (value: string) => {
        setSelectedSector(value);
        setSelectedDepartment("");
    }
    const handleSetDepartment = (value: string) => {
        setSelectedDepartment(value);
    }
    const departmentsToChooseFrom = selectedSector ? sectors.filter(s => s.sectorName === selectedSector)[0].departments : [];
    
    return (
        <div className={classes.searchMenu}>
            <DebouncingSearchBar sectorsLoaded={!!sectors} sector={selectedSector} department={selectedDepartment} />
            {!sectors && <>{/* LOADING SPINNER OR SHINING RECTANGLES */}</>}
            {sectors && <>
                <SectorSelection sectorNames={sectors.map(s => { return { sectorName: s.sectorName, _id: s._id } })} handleSetSector={handleSetSector} />
                <DepartmentSelection departments={departmentsToChooseFrom} handleSetDepartment={handleSetDepartment} />
            </>}
        </div>
    )
}

export default SearchMenu;