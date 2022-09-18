import { CSSProperties } from 'react';
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = ({ overrideStyle }: { overrideStyle?: CSSProperties }) => {
    return <div className={classes.wrapper}><div className={classes.spinner} style={overrideStyle}></div></div>
};

export default LoadingSpinner;