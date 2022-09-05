import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";
import ListItem from "./ListItem";
import SearchMenu from "./SearchMenu";
import classes from './HomePage.module.css';


const HomePage = () => {
    const navigate = useNavigate();
    const items = useAppSelector(state => state.items.items);

    const goToItemPage = (cat: string) => {
        navigate(`/items/${cat}`);
    }

    return (
        <>
            <SearchMenu />
            <div className={classes.listItemPusher}></div>
            {items.map(i => <ListItem key={i._id} name={i.name} cat={i.cat} goToItemPage={goToItemPage} />)}
        </>
    )
}; 

export default HomePage;