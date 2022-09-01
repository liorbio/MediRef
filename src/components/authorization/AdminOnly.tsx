import { ReactNode } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";

const AdminOnly = ({ children }: { children: ReactNode }) => {
    const frontEndPrivilege = useAppSelector(state => state.auth.frontEndPrivilege);
    
    return (
        <>
            {frontEndPrivilege === "admin" ? children : "Page usable only by admin"}
        </>
    )
};

export default AdminOnly;