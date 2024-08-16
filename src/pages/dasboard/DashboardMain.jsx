import React from "react";
import { useSelector } from "react-redux";
import AddAgency from "../../pages-components/agencyManagement/AddAgency";
import ViewAgency from "../../pages-components/agencyManagement/ViewAgency";
import UserManagement from "../../pages-components/agencyManagement/UserManagement";

const DashboardMain = () => {
    const selectedOption = useSelector((state) => state.dashboard.option);

    return (
        <div>
            {selectedOption === "Add Agency" && <AddAgency/>}
            {selectedOption === "View Agency" && <ViewAgency/>}
            {selectedOption === "User Management" && <UserManagement/>}


        </div>
    );
};

export default DashboardMain;
