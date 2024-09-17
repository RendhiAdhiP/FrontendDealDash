import { Outlet } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { ConfirmModal } from "../../../components/ConfirmModel";


export default function Index() {

    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
}