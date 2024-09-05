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
import BookingEngine from "../../pages-components/BookingEngine";
import AnalyticsDashboard from "../../pages-components/AnalyticsDashboard";
import CustomerStatement from "../../pages-components/Report/CustomerStatement";
import WalletStatement from "../../pages-components/Report/WalletStatement";
import TransactionReports from "../../pages-components/Report/TransactionReports";


const DashboardMain = () => {
    const selectedOption = useSelector((state) => state.dashboard.option);
    const userData = useSelector((state) => state.user.loginUser)
    return (
        <div>
            {selectedOption === "Add Agency" && userData.role === "super_admin" && <AddAgency />}
            {selectedOption === "View Agency" && <ViewAgency />}
            {selectedOption === "User Management" && <UserManagement />}
            {selectedOption === "Flight Booking" && <FlightBooking />}
            {selectedOption === "Product List" && <ProductList />}
            {selectedOption === "Commercial Plans" && <CommercialPlans />}
            {selectedOption === "Migration" && <Migration />}
            {selectedOption === "Command Builder" && <CommandBuilder />}
            {selectedOption === "Booking Engine" && <BookingEngine />}
            {selectedOption === "Dashbord" && <AnalyticsDashboard />}
            {selectedOption === "Customer Statement" && <CustomerStatement/>}
            {selectedOption === "Wallet Statement" && <WalletStatement/>}
            {selectedOption === "Transaction Reports" && <TransactionReports/>}




        </div>

    );
};

export default DashboardMain;
