import classes from "./Button.module.css";

const BigButton = ({ text, action }: { text: string, action: () => void }) => {
    const handleClick = () => {
        action();
    }

    return (
        <div className={classes.bigBtn} onClick={handleClick}>
            {text}
        </div>
    )
};

export default BigButton;