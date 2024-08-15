import React from "react";
import { useSelector } from "react-redux";
import ViewAgency from "../agencyManagement/ViewAgency";
import AddAgency from "../agencyManagement/AddAgency";

const DashboardMain = () => {
    const selectedOption = useSelector((state) => state.dashboard.option);

    return (
        <div>
            {selectedOption === "Add Agency" && <AddAgency/>}
            {selectedOption === "View Agency" && <ViewAgency/>}


        </div>
    );
};

export default DashboardMain;
