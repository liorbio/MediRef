import ReactDOM from 'react-dom';
import { portalElement } from '../../elements/portalElement';
import classes from './AreYouSure.module.css';

const AreYouSure = ({ text, leftText, rightText, leftAction, rightAction }: { text: string, leftText: string, rightText: string, leftAction: () => void, rightAction: () => void }) => {
    
    const background = <div className={classes.background}></div>;

    const modal = <div className={classes.modal}>
        <p>{text}</p>
        <div className={classes.bottomRow}>
            <div className={classes.rightButton} onClick={rightAction}>{rightText}</div><div className={classes.leftButton} onClick={leftAction}>{leftText}</div>
        </div>
    </div>;
    
    return (
        <>
            {ReactDOM.createPortal(
                <>
                    {background}
                    {modal}
                </>
            , portalElement)}
        </>
    )
};

export default AreYouSure;