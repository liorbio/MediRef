import { useEffect, useState } from "react";
import { Sector } from "../../types/sector_types";
import DebouncingSearchBar from "./DebouncingSearchBar";
import DepartmentSelection from "./DepartmentSelection";
import SectorSelection from "./SectorSelection";
import classes from './HomePage.module.css';

const SearchMenu = () => {
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [selectedSector, setSelectedSector] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");

    useEffect(() => {
        // FETCH SECTORS FROM API + use setSectors on them.
        fetch(`/sectors`).then((res) => res.json()).then((res) => {
            setSectors(res);
        });
    }, []);

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
            <DebouncingSearchBar sector={selectedSector} department={selectedDepartment} />
            {!sectors && <>{/* LOADING SPINNER OR SHINING RECTANGLES */}</>}
            {sectors && <>
                <SectorSelection sectorNames={sectors.map(s => { return { sectorName: s.sectorName, _id: s._id } })} handleSetSector={handleSetSector} />
                <DepartmentSelection departments={departmentsToChooseFrom} handleSetDepartment={handleSetDepartment} />
            </>}
        </div>
    )
}

export default SearchMenu;