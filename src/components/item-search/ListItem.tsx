import classes from './HomePage.module.css';

const ListItem = ({ name, cat, shouldBeColored, goToItemPage }: { name: string, cat: string, shouldBeColored: boolean, goToItemPage: (cat: string) => void }) => {
    const handleClick = () => {
        goToItemPage(cat);
    }
    return (
        <div onClick={handleClick} className={classes.listItem} style={shouldBeColored ? { backgroundColor: "#ffe1bc" } : {}}>
            <h2>{name}</h2>
            <p>{cat}</p>
        </div>
    )
};

export default ListItem;