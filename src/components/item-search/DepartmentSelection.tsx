const DepartmentSelection = ({ departments, handleSetDepartment }: { departments: string[], handleSetDepartment: (value: string) => void }) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSetDepartment(event.target.value);
    }
    
    return (
        <select name="departments" id="departments" onChange={handleSelect}>
            {departments.map(d => <option value={d}>{d}</option>)}
        </select>
    );
};

export default DepartmentSelection;