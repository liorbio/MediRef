import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Item } from "../../types/item_types";

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
            {item.models && 
                <>
                    <h2>דגמים</h2>
                    {item.models.map(m => <p>{`${m.cat} - ${m.name}`}</p>)}
                </>    
            }
            {item.kitItem && 
                <>
                    <h2>שייך לערכות</h2>
                    {item.kitItem.map(m => <p>{`${m.cat} - ${m.name}`}</p>)}
                </>    
            }
            {item.belongsToKits && 
                <>
                    <h2>שייך לערכות</h2>
                    {item.belongsToKits.map(m => <p>{`${m.cat} - ${m.name}`}</p>)}
                </>    
            }
            {
                item.similarItems &&
                <>
                    <h2>אביזרים</h2>
                    {item.similarItems.map(m => <p>{`${m.cat} - ${m.name}`}</p>)}
                </>  
            }
            {
                item.accessories &&
                <>
                    <h2>אביזרים</h2>
                    {item.accessories.map(m => <p>{`${m.cat} - ${m.name}`}</p>)}
                </>  
            }
            {
                item.consumables &&
                <>
                    <h2>אביזרים</h2>
                    {item.consumables.map(m => <p>{`${m.cat} - ${m.name}`}</p>)}
                </>  
            }
        </>}
        </>
    );
};

export default ItemPage;