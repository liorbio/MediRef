import { Department } from "../../types/sector_types";

const DepartmentSelection = ({ departments, handleSetDepartment, priorChosenDepartment }: { departments: Department[], handleSetDepartment: (value: string) => void, priorChosenDepartment?: string }) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSetDepartment(event.target.value);
    }
    
    return (
        <select name="departments" id="departments" onChange={handleSelect} value={priorChosenDepartment}>
            <option value="">בחר תחום...</option>
            {departments.map(d => <option key={d._id} value={d.departmentName}>{d.departmentName}</option>)}
        </select>
    );
};

export default DepartmentSelection;