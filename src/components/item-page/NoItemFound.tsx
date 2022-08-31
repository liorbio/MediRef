import BigButton from "../UI/BigButton";

const NoItemFound = ({ cat }: { cat: string }) => {
    return (
        <>
            <p>{`לא נמצא ערך עבור ${cat}`}</p>
            <BigButton text="צור ערך" />
        </>
    )
};

export default NoItemFound;