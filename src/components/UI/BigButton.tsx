import { CSSProperties } from "react";
import classes from "./Button.module.css";

const BigButton = ({ text, action, overrideStyle }: { text: string, action: () => void, overrideStyle?: CSSProperties }) => {
    const handleClick = () => {
        action();
    }

    return (
        <div className={classes.bigBtn} onClick={handleClick} style={overrideStyle}>
            {text}
        </div>
    )
};

export default BigButton;