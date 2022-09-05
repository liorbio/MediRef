import { useNavigate } from "react-router-dom";
import AdminOnly from "../authorization/AdminOnly";
import BigButton from "../UI/BigButton";

const NoItemFound = ({ cat }: { cat: string }) => {
    const navigate = useNavigate();

    const moveToCreatingItemPage = () => {
        navigate(`/itemmenu/${cat}`);
    }

    return (
        <>
            <p>{`לא נמצא ערך עבור ${cat}`}</p>
            <AdminOnly><BigButton text="צור ערך" action={moveToCreatingItemPage} /></AdminOnly>
        </>
    )
};

export default NoItemFound;