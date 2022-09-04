import classes from './HomePage.module.css';

const ListItem = ({ name, cat, goToItemPage }: { name: string, cat: string, goToItemPage: (cat: string) => void }) => {
    const handleClick = () => {
        goToItemPage(cat);
    }
    return (
        <div onClick={handleClick} className={classes.listItem}>
            <h2>{name}</h2>
            <p>{cat}</p>
        </div>
    )
};

export default ListItem;