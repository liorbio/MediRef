import classes from "Button.module.css";

const BigButton = ({ text }: { text: string }) => {
    return (
        <div className={classes.bigBtn}>
            {text}
        </div>
    )
};

export default BigButton;