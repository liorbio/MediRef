import { useAppSelector } from "../../hooks/redux-hooks";
import LeftHeaderSide from "./LeftHeaderSide";
import RightHeaderSide from "./RightHeaderSide";

const Header = () => {
    const loggedIn = useAppSelector(state => !!state.auth.jwt);

    return (
        <nav>
            <RightHeaderSide loggedIn={loggedIn} />
            <h1>MediRef</h1>
            {loggedIn && <LeftHeaderSide />}
        </nav>
    )
};

export default Header;