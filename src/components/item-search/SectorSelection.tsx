import React from "react";

const SectorSelection = ({ sectorNames, handleSetSector }: { sectorNames: string[], handleSetSector: (value: string) => void }) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSetSector(event.target.value);
    }
    
    return (
        <select name="sectors" id="sectors" onChange={handleSelect}>
            {sectorNames.map(s => <option value={s}>{s}</option>)}
        </select>
    );
};

export default SectorSelection;