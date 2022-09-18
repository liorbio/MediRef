import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import ListItem from "./ListItem";
import SearchMenu from "./SearchMenu";
import classes from './HomePage.module.css';
import LoadingSpinner from "../UI/LoadingSpinner";
import { UIEvent, useEffect, useState } from "react";
import { viewingActions } from "../../store/viewing-slice";
import { itemsActions } from "../../store/item-slice";

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.items.items);
    const { searchVal, sector, department, page, blockScrollSearch } = useAppSelector(state => state.viewing.searching); 

    const goToItemPage = (cat: string) => {
        navigate(`/items/${cat}`);
    }

    useEffect(() => {
        dispatch(viewingActions.emptySearchCriteria());
    }, [dispatch]);

    let scrollThrottler = true;
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        if (!blockScrollSearch && scrollThrottler && (event.currentTarget.scrollHeight - event.currentTarget.scrollTop < event.currentTarget.clientHeight + 70))  {
            scrollThrottler = false;
            fetch(encodeURI(`/items?search=${searchVal}&sector=${sector}&department=${department}&page=${page}`))
                .then((res) => res.json())
                .then((jsonedRes) => {
                    if (jsonedRes.length > 0) {
                        dispatch(viewingActions.changeSearchCriteria({ page: page + 1 }));
                        dispatch(itemsActions.addItems(jsonedRes));
                    } else {
                        dispatch(viewingActions.changeBlockSearcScroll(true));
                    }
                });
        }
    }

    return (
        <>
            <SearchMenu />
            <div className={classes.listItemPusher}></div>
            {items.length === 0 && <LoadingSpinner />}
            <div className={classes.itemsWrapper} onScroll={handleScroll}>
                {items.map(i => <ListItem key={i._id} name={i.name} cat={i.cat} goToItemPage={goToItemPage} />)}
            </div>
        </>
    )
}; 

export default HomePage;