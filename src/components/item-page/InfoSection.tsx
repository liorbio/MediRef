import { useNavigate } from "react-router-dom";
import { AbbreviatedItem } from "../../types/item_types";
import classes from './ItemPage.module.css';

const InfoSection = ({ title, elements, unclickable }: { title: string, elements: AbbreviatedItem[], unclickable?: boolean }) => {
    const navigate = useNavigate();
    
    return (
        <>
            <h2>{title}</h2>
            {elements.map(m => <p onClick={() => { if (!unclickable) navigate(`/items/${m.cat}`) }} key={m.cat} className={!unclickable ? classes.clickable : ""}>{`${m.cat} - ${m.name}`}</p>)}
        </>   
    )
};

export default InfoSection;