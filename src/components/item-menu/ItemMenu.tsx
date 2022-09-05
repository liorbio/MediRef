import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { viewingActions } from '../../store/viewing-slice';
import { AbbreviatedItem, Item } from '../../types/item_types';
import { Sector } from '../../types/sector_types';
import DepartmentSelection from '../item-search/DepartmentSelection';
import SectorSelection from '../item-search/SectorSelection';
import BigButton from '../UI/BigButton';
import CatTypeSelection from './CatTypeSelection';
import classes from './itemMenu.module.css';

const ItemMenu = () => {
    const params = useParams();
    const [itemToEdit, setItemToEdit] = useState<null | Item>();
    const authToken = useAppSelector(state => state.auth.jwt);
    const [sectorsToChooseFrom, setSectorsToChooseFrom] = useState<Sector[]>([]);
    const dispatch = useAppDispatch();
    const [name, setName] = useState(itemToEdit?.name ?? "");
    const [cat, setCat] = useState(itemToEdit?.cat ?? "");
    const [sector, setSector] = useState(itemToEdit?.sector ?? "");
    const [department, setDepartment] = useState(itemToEdit?.department ?? "");
    const [catType, setCatType] = useState(itemToEdit?.catType ?? "מקט רגיל");
    const [description, setDescription] = useState(itemToEdit?.description ?? "");
    const [imageLink, setImageLink] = useState(itemToEdit?.imageLink ?? "");
    const [models, setModels] = useState<AbbreviatedItem[]>([]);
    const [accessories, setAccessories] = useState<AbbreviatedItem[]>([]);
    const [consumables, setConsumables] = useState<AbbreviatedItem[]>([]);
    const [belongsToKits, setBelongsToKits] = useState<AbbreviatedItem[]>([]);
    const [similarItems, setSimilarItems] = useState<AbbreviatedItem[]>([]);
    const [kitItem, setKitItem] = useState<AbbreviatedItem[]>([]);

    const itemDetails = {
        name: name,
        cat: cat,
        sector: sector,
        department: department,
        catType: catType,
        description: description,
        imageLink: imageLink,
        models: models,
        accessories: accessories,
        consumables: consumables,
        belongsToKits: belongsToKits,
        similarItems: similarItems,
        kitItem: kitItem
    };

    useEffect(() => {
        const getSectors = async () => {
            const fetchedSectors = await fetch(`/sectors`, {
                headers: { 'auth-token': authToken }
            });
            return await fetchedSectors.json();
        };
        getSectors().then(s => {
            setSectorsToChooseFrom(s)
        }).catch(err => console.log(`Error fetching sectors: ${err}`));

        if (params.itemid) {
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
                setItemToEdit(i);
            }).catch(e => console.log(`Error fetching item details: ${e}`));
        }
    }, [params.itemid, authToken]);

    const handleInput = (setFunc: React.Dispatch<React.SetStateAction<string>>, event: ChangeEvent<HTMLInputElement>) => {
        setFunc(event.target.value);
        dispatch(viewingActions.changesAppliedToItem);
    }
    const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        dispatch(viewingActions.changesAppliedToItem);
    }
    const handleSetSector = (value: string) => {
        setSector(value);
        setDepartment("");
        dispatch(viewingActions.changesAppliedToItem);
    }
    const handleSetDepartment = (value: string) => {
        setDepartment(value);
        dispatch(viewingActions.changesAppliedToItem);
    }
    const departmentsToChooseFrom = sector ? sectorsToChooseFrom.filter(s => s.sectorName === sector)[0].departments : [];
    const handleSetCatType = (catType: "מקט רגיל" | "מקט ערכה") => {
        setCatType(catType);
    }
    const handleSave = () => {
        if (!itemToEdit) {
            fetch(`/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify(itemDetails)
            }).then((res) => console.log("success saving item"))
            .catch((err) => console.log(`Error saving item: ${err}`));
        }
        if (itemToEdit) {
            fetch(`/items/${params.itemid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify(itemDetails)
            }).then((res) => console.log("success updating item"))
            .catch((err) => console.log(`Error updating item: ${err}`));
        }
    }

    return (
        <div className={classes.itemMenu}>
            <h1>{itemToEdit ? "עריכת פריט" : "הוספת פריט"}</h1>
            <input type="text" placeholder='שם הפריט' value={name} onChange={(e) => handleInput(setName, e)} />
            <input type="text" placeholder='מק"ט' value={cat} onChange={(e) => handleInput(setCat, e)} />
            <SectorSelection sectorNames={sectorsToChooseFrom.map(s => { return { sectorName: s.sectorName, _id: s._id } })} handleSetSector={handleSetSector} />
            <DepartmentSelection departments={departmentsToChooseFrom} handleSetDepartment={handleSetDepartment} />
            <CatTypeSelection selectCatType={handleSetCatType} />
            <textarea value={description} onChange={handleDescription} placeholder="תיאור" />
            <input type="text" placeholder='קישור לתמונה' value={imageLink} onChange={(e) => handleInput(setImageLink, e)} />
            
            <BigButton text="שמור" action={handleSave} />
        </div>
    )
};

export default ItemMenu;