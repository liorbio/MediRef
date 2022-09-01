import { useAppSelector } from "../../hooks/redux-hooks";
import LeftHeaderSide from "./LeftHeaderSide";
import RightHeaderSide from "./RightHeaderSide";

const Header = () => {
    const loggedInAsAdmin = useAppSelector(state => state.auth.frontEndPrivilege !== "public");

    return (
        <nav>
            <RightHeaderSide loggedInAsAdmin={loggedInAsAdmin} />
            <h1>MediRef</h1>
            {loggedInAsAdmin && <LeftHeaderSide />}
        </nav>
    )
};

export default Header;