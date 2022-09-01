import { useEffect, useState } from "react";
import { Sector } from "../../types/sector_types";
import DebouncingSearchBar from "./DebouncingSearchBar";
import DepartmentSelection from "./DepartmentSelection";
import SectorSelection from "./SectorSelection";

const SearchMenu = () => {
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [selectedSector, setSelectedSector] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");

    useEffect(() => {
        // FETCH SECTORS FROM API + use setSectors on them.
    }, []);

    const handleSetSector = (value: string) => {
        setSelectedSector(value);
    }
    const handleSetDepartment = (value: string) => {
        setSelectedDepartment(value);
    }
    const departmentsToChooseFrom = selectedSector ? sectors.filter(s => s.sectorName === selectedSector)[0].departments : [];

    return (
        <div>
            <DebouncingSearchBar sector={selectedSector} department={selectedDepartment} />
            {sectors && <>
                <SectorSelection sectorNames={sectors.map(s => s.sectorName)} handleSetSector={handleSetSector} />
                <DepartmentSelection departments={departmentsToChooseFrom} handleSetDepartment={handleSetDepartment} />
            </>}
        </div>
    )
}

export default SearchMenu;