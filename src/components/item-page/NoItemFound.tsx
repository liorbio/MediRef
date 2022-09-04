import { useNavigate } from "react-router-dom";
import BigButton from "../UI/BigButton";

const NoItemFound = ({ cat }: { cat: string }) => {
    const navigate = useNavigate();

    const moveToCreatingItemPage = () => {
        navigate(`/itemmenu/${cat}`);
    }

    return (
        <>
            <p>{`לא נמצא ערך עבור ${cat}`}</p>
            <BigButton text="צור ערך" action={moveToCreatingItemPage} />
        </>
    )
};

export default NoItemFound;