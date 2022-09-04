import { useAppSelector } from "../../hooks/redux-hooks";
import LeftHeaderSide from "./LeftHeaderSide";
import RightHeaderSide from "./RightHeaderSide";
import classes from './Header.module.css';

const Header = () => {
    const loggedInAsAdmin = useAppSelector(state => state.auth.frontEndPrivilege !== "public");

    return (
        <nav className={classes.navbar}>
            <RightHeaderSide loggedInAsAdmin={loggedInAsAdmin} />
            <h1>MediRef</h1>
            {loggedInAsAdmin && <LeftHeaderSide />}
        </nav>
    )
};

export default Header;