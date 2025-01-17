import { ChangeEvent, useEffect } from "react";
import { backendFirebaseUri } from "../../backend-variables/address";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { itemsActions } from "../../store/item-slice";
import { viewingActions } from "../../store/viewing-slice";
import classes from './HomePage.module.css';

const DEBOUNCE_LAG = 800;

const DebouncingSearchBar = ({ sectorsLoaded, sector, department }: { sectorsLoaded: boolean, sector: string, department: string }) => {
    const dispatch = useAppDispatch();
    const noItemsLoaded = useAppSelector(state => state.items.items.length === 0);
    const searchVal = useAppSelector(state => state.viewing.searching.searchVal);
    const authToken = useAppSelector(state => state.auth.jwt);

    const handleWrite = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(viewingActions.changeSearchCriteria({ searchVal: event.currentTarget.value }));
    };
    const eraseSearchVal = () => {
        dispatch(viewingActions.changeSearchCriteria({ searchVal: "" }));
    }

    // Send ajax requests only upon changing the searchVal
    useEffect(() => { // Apply a DEBOUNCE_LAG amount of time allowing for more writing to happen without sending an ajax request
        if (sectorsLoaded && noItemsLoaded) { // this prevents an unnecessary ajax request sent on mount which gets re-done when sectors load
            const debouncer = setTimeout(() => {
                dispatch(itemsActions.clearItemList());

                // FETCH IN DEVELOPMENT VIA PROXYING
                // READ MORE HERE: https://create-react-app.dev/docs/proxying-api-requests-in-development/
                dispatch(itemsActions.declareSearchComplete(false));
                fetch(encodeURI(`${backendFirebaseUri}/items?search=${searchVal}&sector=${sector}&department=${department}`), {
                    headers: {
                        'auth-token': authToken
                    }
                })
                    .then((res) => res.json())
                    .then((jsonedRes) => {
                        dispatch(itemsActions.setItems(jsonedRes));
                        dispatch(itemsActions.declareSearchComplete(true));
                    }).catch((err) => console.log(`Error fetching items: ${err}`));
            }, DEBOUNCE_LAG);

            return () => {
                clearTimeout(debouncer);
            }
        }
        return () => {
            dispatch(itemsActions.clearItemList());
        }
    }, [searchVal, sector, department, dispatch, sectorsLoaded, noItemsLoaded, authToken]);

    return (
        <div className={classes.searchBarWrapper}>
            <input type="text" value={searchVal} onChange={handleWrite} />
            {searchVal.length > 0 && <div className={classes.xButton} onClick={eraseSearchVal}>×</div>}
        </div>
    )
};

export default DebouncingSearchBar;