const CatTypeSelection = ({ selectCatType }: { selectCatType: (catType: "מקט רגיל" | "מקט ערכה") => void }) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        selectCatType(event.target.value as "מקט רגיל" | "מקט ערכה");
    }

    return (
        <select name="cattype" id="cattype" onChange={handleSelect}>
            <option>מקט רגיל</option>
            <option>מקט ערכה</option>
        </select>
    )
};

export default CatTypeSelection;