import React from "react";
import { useSelector } from "react-redux";
import AddAgency from "../../pages-components/agencyManagement/AddAgency";
import ViewAgency from "../../pages-components/agencyManagement/ViewAgency";
import UserManagement from "../../pages-components/agencyManagement/UserManagement";
import FlightBooking from "../../pages-components/CRM/FlightBooking";
import ProductList from "../../pages-components/Administration/ProductList";
import CommercialPlans from "../../pages-components/Administration/CommercialPlans";
import Migration from "../../pages-components/Administration/Migration";
import CommandBuilder from "../../pages-components/Administration/CommandBuilder";

const DashboardMain = () => {
    const selectedOption = useSelector((state) => state.dashboard.option);

    return (
        <div>
            {selectedOption === "Add Agency" && <AddAgency/>}
            {selectedOption === "View Agency" && <ViewAgency/>}
            {selectedOption === "User Management" && <UserManagement/>}
            {selectedOption === "Flight Booking" && <FlightBooking/>}
            {selectedOption === "Product List" && <ProductList/>}
            {selectedOption === "Commercial Plans" && <CommercialPlans/>}
            {selectedOption === "Migration" && <Migration/>}
            {selectedOption === "Command Builder" && <CommandBuilder/>}


        </div>
    );
};

export default DashboardMain;
