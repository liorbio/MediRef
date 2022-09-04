import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { itemsActions } from "../../store/item-slice";

const DEBOUNCE_LAG = 800;

const DebouncingSearchBar = ({ sectorsLoaded, sector, department }: { sectorsLoaded: boolean, sector: string, department: string }) => {
    const dispatch = useAppDispatch();
    const [searchVal, setSearchVal] = useState("");

    const handleWrite = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(event.currentTarget.value);
    };

    // Send ajax requests only upon changing the searchVal
    useEffect(() => { // Apply a DEBOUNCE_LAG amount of time allowing for more writing to happen without sending an ajax request
        if (sectorsLoaded) { // this prevents an unnecessary ajax request sent on mount which gets re-done when sectors load
            const debouncer = setTimeout(() => {
                dispatch(itemsActions.clearItemList());

                // FETCH IN DEVELOPMENT VIA PROXYING
                // READ MORE HERE: https://create-react-app.dev/docs/proxying-api-requests-in-development/
                console.log(`URL: /items?search=${searchVal}&sector=${sector}&department=${department}`)
                fetch(`/items?search=${searchVal}&sector=${sector}&department=${department}`)
                    .then((res) => res.json())
                    .then((jsonedRes) => dispatch(itemsActions.setItems(jsonedRes)));
            }, DEBOUNCE_LAG);

            return () => {
                clearTimeout(debouncer);
            }
        }
    }, [searchVal, sector, department, dispatch, sectorsLoaded]);

    return (
        <input type="text" value={searchVal} onChange={handleWrite} />
    )
};

export default DebouncingSearchBar;