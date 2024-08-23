import { useRoutes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from './pages/NotFound';
import Splashscreen from './pages/Splashscreen/Splashscreen.tsx';
import BHRegistration from './pages/admin/BHRegistration/BHRegistration.tsx';
import OwnerRegistration from './pages/admin/OwnerRegistration/OwnerRegistration.tsx';
import BHInfo from './pages/admin/BHInfo/BHInfo.tsx';
import BoarderRegistration from './pages/user/BoarderRegistration/BoarderRegistration.tsx';
import GuardianRegistration from './pages/user/GuardianRegistration/GuardianRegistration.tsx';
import BillRegistration from './pages/user/BillRegistration/BillRegistration.tsx';
import BoarderFaceRegistration from './pages/user/BoarderFaceRegistration/BoarderFaceRegistration.tsx';
import BoarderRegistrationSuccessful from './pages/user/BoarderRegistrationSuccessful/BoarderRegistrationSuccessful.tsx';
import Transactions from './pages/user/Transactions/Transactions.tsx';
import BoarderProfile from './pages/user/BoarderProfile/BoarderProfile.tsx';
import PayNow from './pages/user/PayNow/PayNow.tsx';
import BillDetails from './pages/user/BillDetails/BillDetails.tsx';
import Dashboard from './pages/admin/Dashboard/Dashboard.tsx';
import ReportSummary from "./pages/admin/ReportSummary/ReportSummary.tsx";
import RoomInfo from './pages/admin/RoomInfo/RoomInfo.tsx';
import RoomShow from './pages/admin/RoomInfo/RoomShow.tsx';
import BoardersInfo from './pages/admin/BoardersInfo/BoardersInfo.tsx';
import OptionPage from "./pages/OptionPage/OptionPage.tsx";
import Test from "./pages/test/test.tsx";
import GreetTenants from "./pages/greetings/greetings_tenant.tsx";
import GreetAdmin from "./pages/greetings/greetings_admin.tsx";
import GreetGuest from "./pages/greetings/greetings_guest.tsx";

const ProjectRoutes = () => {
let element = useRoutes([
    { path: "/", element: <Splashscreen/> },
    { path: "*", element: <NotFound /> },
    {
        path: "home",
        element: <Home />,
        },
        {
        path: "bhregistration",
        element: <BHRegistration />,
        },
        {
        path: "ownerregistration",
        element: <OwnerRegistration />,
        },
        {
        path: "bhinfo",
        element: <BHInfo />,
        },
        {
        path: "boarderregistration",
        element: <BoarderRegistration />,
        },
        {
        path: "guardianregistration",
        element: <GuardianRegistration />,
        },
        {
        path: "billregistration",
        element: <BillRegistration />,
        },
        {
        path: "boarderfaceregistration",
        element: <BoarderFaceRegistration />,
        },
        {
        path: "boarderregistrationsuccessful",
        element: <BoarderRegistrationSuccessful />,
        },
        {
        path: "transactions",
        element: <Transactions />,
        },
        {
        path: "boarderprofile",
        element: <BoarderProfile />,
        },
        {
        path: "paynow",
        element: <PayNow />,
        },
        {
        path: "billdetails",
        element: <BillDetails />,
        },
        {
        path: "dashboard",
        element: <Dashboard />,
        },
        {
        path: "reportsummary",
        element: <ReportSummary />,
        },
        {
        path: "roominfo",
        element: <RoomInfo />,
        },
        {
        path: "boardersinfo",
        element: <BoardersInfo />,
        },
        {
        path: "optionpage",
        element: <OptionPage />,
        },
        {
        path: "test",
        element: <Test />,
        },
        {
        path: "greet2",
        element: <GreetTenants />,
        },
        {
        path: "greet1",
        element: <GreetAdmin />,
        },
        {
        path: "greet3",
        element: <GreetGuest />,
        },
        {
        path: "roomshow",
        element: <RoomShow />,
        },
    ]);

    return element;
};

export default ProjectRoutes;
        
    



