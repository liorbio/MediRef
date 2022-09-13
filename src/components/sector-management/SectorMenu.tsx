import { Sector } from "../../types/sector_types";
import BigButton from "../UI/BigButton";
import classes from './SectorManagement.module.css';

const SectorMenu = ({ sector }: { sector?: Sector }) => {
    return (
        <div className={classes.wrapper}>
            <input type="text" placeholder="שם המדור" />
            <input type="checkbox" id="hiddenFromPublic" />
            <label htmlFor="hiddenFromPublic">מוסתר מהציבור</label>
            
            <BigButton text="שמור" action={()=>{}} />
        </div>
    )
};

export default SectorMenu;