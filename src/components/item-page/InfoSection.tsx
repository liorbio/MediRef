import { AbbreviatedItem } from "../../types/item_types"

const InfoSection = ({ title, elements }: { title: string, elements: AbbreviatedItem[] }) => {
    return (
        <>
            <h2>{title}</h2>
            {elements.map(m => <p key={m.cat}>{`${m.cat} - ${m.name}`}</p>)}
        </>   
    )
};

export default InfoSection;