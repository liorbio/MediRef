import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import classes from './SectorMenu.module.css';

const SectorMenu = () => {
    const [sectors, setSectors] = useState<string[]>([]);
    const authToken = useAppSelector(state => state.auth.jwt);

    useEffect(() => {
        fetch(`/sectors`, {
            headers: {
                'auth-token': authToken
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setSectors(res)
            })
            .catch((err) => console.log(`Error fetching sectors: ${err}`))
    }, [authToken]);
    return (
        <div>
            <h1>עריכת מדורים</h1>
            {sectors.map(s => <div className={classes.sectorButton} key={s}>{s}</div>)}
            <div>+</div>
        </div>
    )
};

export default SectorMenu;