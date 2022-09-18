import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Item } from "../../types/item_types";
import InfoSection from "./InfoSection";
import NoItemFound from "./NoItemFound";
import classes from './ItemPage.module.css';
import { viewingActions } from "../../store/viewing-slice";
import LoadingSpinner from "../UI/LoadingSpinner";

const ItemPage = () => {
    const params = useParams();
    const authToken = useAppSelector(state => state.auth.jwt);
    const [item, setItem] = useState<Item | null>(null);
    const [itemNotFound, setItemNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const frontEndPrivilege = useAppSelector(state => state.auth.frontEndPrivilege);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getItem = async () => {
            const fetchedItem = await fetch(`/items/${params.itemid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'auth-token': authToken
                }
            });
            return await fetchedItem.json();
        };
        getItem().then(i => {
            setItem(i);
            setLoading(false);
            if (frontEndPrivilege === "admin") {
                dispatch(viewingActions.manageItem(params.itemid as string));
            }
        }).catch(e => {
            setItemNotFound(true);
            setLoading(false);
        });

        return () => {
            setItem(null);
            setItemNotFound(false);
        }
    }, [params.itemid, authToken, frontEndPrivilege, dispatch]);

    return (
        <>
        {loading && <LoadingSpinner />}
        {!loading && itemNotFound && <NoItemFound cat={params.itemid as string} />}
        {!loading && item && <div className={classes.itemPage}>
            <header>
                <h6>{item.sector}</h6>
                <h6>{item.department}</h6>
            </header>
            <h1>{item.name}</h1>
            <p>{`מק"ט: ${item.cat}`}</p>
            {item.description && <p>{item.description}</p>}
            {item.imageLink && <img crossOrigin="anonymous" src="../logo192.png" alt={item.name} />}
            {(["admin","hanar"].includes(frontEndPrivilege) && item.qaStandardLink) && <a href={item.qaStandardLink}>לחץ להגעה לתקן בחינה</a>}
            {item.models && item.models.length > 0 && <InfoSection title="דגמים" elements={item.models} unclickable={true} />}
            {item.kitItem && item.kitItem.length > 0 && <InfoSection title="מכשיר" elements={item.kitItem} />}
            {item.belongsToKits && item.belongsToKits.length > 0 && <InfoSection title="שייך לערכות" elements={item.belongsToKits} />}
            {item.similarItems && item.similarItems.length > 0 && <InfoSection title="פריטים דומים" elements={item.similarItems} />}
            {item.accessories && item.accessories.length > 0 && <InfoSection title="אביזרים" elements={item.accessories} />}
            {item.consumables && item.consumables.length > 0 && <InfoSection title="מתכלים" elements={item.consumables} />}
        </div>}
        </>
    );
};

export default ItemPage;