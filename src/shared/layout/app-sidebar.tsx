import { useState } from "react";
import { ChevronRight, List, SearchCode, Printer, Computer, Monitor, ImageUpscale, SwitchCamera, Route, TableConfig, DoorClosed, Download, FilterX, } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible";
import { NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import { deleteStorage } from "@/lib/functions";

const itemsOti = [
    {
        title: "Equipos de computos",
        url: "/oti/computer",
        icon: Computer,
        submenu: [
            { title: "Lista", url: "/oti/list-computer", icon: List },
            { title: "Buscar", url: "/oti/search-computer", icon: SearchCode },
        ]
    },
    {
        title: "Impresoras y scanners",
        url: "/oti/printer-scanner",
        icon: Printer,
        submenu: [
            { title: "Lista", url: "/oti/list-printer-scanner", icon: List },
            { title: "Buscar", url: "/oti/search-printer-scanner", icon: SearchCode },
        ]
    },
    {
        title: "Monitores",
        url: "/oti/monitor",
        icon: Monitor,
        submenu: [
            { title: "Lista", url: "/oti/list-monitor", icon: List },
            { title: "Buscar", url: "/oti/search-monitor", icon: SearchCode },
        ]
    },
    {
        title: "UPS",
        url: "/oti/ups",
        icon: ImageUpscale,
        submenu: [
            { title: "Lista", url: "/oti/list-ups", icon: List },
            { title: "Buscar", url: "/oti/search-ups", icon: SearchCode },
        ]
    },
    {
        title: "Switches",
        url: "/oti/switch",
        icon: SwitchCamera,
        submenu: [
            { title: "Lista", url: "/oti/list-switch", icon: List },
            { title: "Buscar", url: "/oti/search-switch", icon: SearchCode },
        ]
    },
    {
        title: "Routers",
        url: "/oti/router",
        icon: Route,
        submenu: [
            { title: "Lista", url: "/oti/list-router", icon: List },
            { title: "Buscar", url: "/oti/search-router", icon: SearchCode },
        ]
    },
    {
        title: "Otros equipos",
        url: "/oti/other-equipment",
        icon: TableConfig,
        submenu: [
            { title: "Lista", url: "/oti/list-other", icon: List },
            { title: "Buscar", url: "/oti/search-other", icon: SearchCode },
        ]
    },
];

// const allData = [
//     { title: "Filtros", url: "/siga/inventario", icon: FilterX },
// ];

// const itemsSiga = [
//     { title: "Inventario Siga", url: "/siga/inventario", icon: Home },
// ];

// const itemsSinabif = [
//     { title: "Inventario SINABIF", url: "/sinabif/inventario", icon: Home },
// ];

export function AppSidebar() {
    const [openGroup, setOpenGroup] = useState<string | null>(null);

    const handleToggleGroup = (title: string) => {
        setOpenGroup(prev => (prev === title ? null : title));
    };

    return (
        <Sidebar>
            <SidebarContent className="bg-white">
                <div className=" p-4 py-10 border-b">
                    <img src="/logo.png" className="w-full object-fit-contain h-full" alt="" />
                </div>
                {/* OTI */}
                <SidebarGroup>
                    <SidebarGroupLabel>Inventario OTI</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {itemsOti.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <Collapsible open={openGroup === item.title}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                onClick={() => handleToggleGroup(item.title)}
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="pl-6">
                                            {item.submenu.map((subItem) => (
                                                <NavLink
                                                    key={subItem.title}
                                                    to={subItem.url}
                                                    className={({ isActive }) =>
                                                        `flex items-center py-1 px-2 text-sm rounded-md ${isActive
                                                            ? "bg-green-100 text-green-700"
                                                            : "hover:bg-gray-100"
                                                        }`
                                                    }
                                                >
                                                    <subItem.icon className="mr-2 h-4 w-4" />
                                                    <span>{subItem.title}</span>
                                                </NavLink>
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="https://asana.munitambopata.gob.pe/api/patrimonio/oti-computer/download-excel">
                                        <Download className="mr-2 h-4 w-4" />
                                        Exportar datos</a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Filtros */}
                <SidebarGroup>
                    <SidebarGroupLabel>Filtro general</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <NavLink
                                        to={"/oti/filter"}
                                        className={({ isActive }) =>
                                            `flex items-center py-1 text-sm rounded-md ${isActive
                                                ? "bg-blue-100 text-blue-700"
                                                : "hover:bg-gray-100"
                                            }`
                                        }
                                    >
                                        <FilterX className="mr-2 h-4 w-4" />
                                        <span>Filtro (totales)</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* SIGA */}
                <SidebarGroup>
                    <SidebarGroupLabel>SIGA</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* {itemsSiga.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                `flex items-center py-1 text-sm rounded-md ${isActive
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-gray-100"
                                                }`
                                            }
                                        >
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))} */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* SINABIF */}
                <SidebarGroup>
                    <SidebarGroupLabel>SINABIF</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* {itemsSinabif.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                `flex items-center py-1 text-sm rounded-md ${isActive
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-gray-100"
                                                }`
                                            }
                                        >
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))} */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <Button className="mt-6 mx-2" variant="destructive" onClick={deleteStorage}><DoorClosed /> Salir</Button>
            </SidebarContent>
        </Sidebar>
    );
}
