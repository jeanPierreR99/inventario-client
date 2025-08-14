import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-gray-50 px-4">
                <SidebarTrigger />
                <div className="p-4">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}