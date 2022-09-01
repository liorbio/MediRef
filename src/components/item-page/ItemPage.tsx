import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Item } from "../../types/item_types";
import InfoSection from "./InfoSection";

const ItemPage = () => {
    const params = useParams();
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        const getItem = async () => {
            const fetchedItem = await fetch(`https://localhost:5000/${params.itemid}`);
            return await fetchedItem.json();
        };
        getItem().then(i => setItem(i));
    }, [params.itemid]);

    return (
        <>
        {!item && {/* LOADING SPINNER */}}
        {item && <>
            <h1>{item.name}</h1>
            <p>{`מק"ט: ${item.cat}`}</p>
            <p>{item.description}</p>
            {item.imageLink && <img src={item.imageLink} alt={item.name} />}
            {item.models && <InfoSection title="דגמים" elements={item.models} />}
            {item.kitItem && <InfoSection title="מכשיר" elements={item.kitItem} />}
            {item.belongsToKits && <InfoSection title="שייך לערכות" elements={item.belongsToKits} />}
            {item.similarItems && <InfoSection title="פריטים דומים" elements={item.similarItems} />}
            {item.accessories && <InfoSection title="אביזרים" elements={item.accessories} />}
            {item.consumables && <InfoSection title="אביזרים" elements={item.consumables} />}
        </>}
        </>
    );
};

export default ItemPage;