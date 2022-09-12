import React from "react";

type SectorNameOnly = {
    sectorName: string,
    _id: string
};

const SectorSelection = ({ sectorNames, handleSetSector, priorChosenSector }: { sectorNames: SectorNameOnly[], handleSetSector: (value: string) => void, priorChosenSector?: string }) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSetSector(event.target.value);
    }
    
    return (
        <select name="sectors" id="sectors" onChange={handleSelect} value={priorChosenSector}>
            <option value="">בחר מדור...</option>
            {sectorNames.map(s => <option key={s._id} value={s.sectorName}>{s.sectorName}</option>)}
        </select>
    );
};

export default SectorSelection;