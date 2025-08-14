import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Loader2 } from "lucide-react";
import React from "react";
import Layout from "@/shared/layout/Layout";

const LoadingFallback = () => <div className="min-w-screen min-h-screen bg-gray-100/70  flex justify-center items-center">
    <Loader2 className="animate-spin text-green-500" />
</div>;


//oti
const ComputerSearch = React.lazy(() => import("@/features/admin/oti/pages/ComputerSearch"));
const ComputerList = React.lazy(() => import("@/features/admin/oti/pages/ComputerList"));

const PrinterScannerList = React.lazy(() => import("@/features/admin/oti/pages/PrinterScannerList"));
const PrinterScannerSearch = React.lazy(() => import("@/features/admin/oti/pages/PrinterScannerSearch"));

const MonitorList = React.lazy(() => import("@/features/admin/oti/pages/MonitorList"));
const MonitorSearch = React.lazy(() => import("@/features/admin/oti/pages/MonitorSearch"));

const SwitchList = React.lazy(() => import("@/features/admin/oti/pages/SwitchList"));
const SwitchSearch = React.lazy(() => import("@/features/admin/oti/pages/SwitchSearch"));

const RouterList = React.lazy(() => import("@/features/admin/oti/pages/RouterList"));
const RouterSearch = React.lazy(() => import("@/features/admin/oti/pages/RouterSearch"));

const UpsList = React.lazy(() => import("@/features/admin/oti/pages/UpsList"));
const UpsSearch = React.lazy(() => import("@/features/admin/oti/pages/UpsSearch"));

const OtherList = React.lazy(() => import("@/features/admin/oti/pages/OtherList"));
const OtherSearch = React.lazy(() => import("@/features/admin/oti/pages/OtherSearch"));


const withSuspense = (Component: React.ReactNode) => (
    <Suspense fallback={<LoadingFallback />}>{Component}</Suspense>
);

export const RouteAdmin: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <div>Ocurrio un error</div>,
        children: [
            {
                index: true,
                element: withSuspense(<ComputerList />),
            },
            {
                path: "oti",
                children: [
                    {
                        path: "search-computer/:code?",
                        element: withSuspense(<ComputerSearch />),
                    },
                    {
                        path: "list-computer",
                        element: withSuspense(<ComputerList />),
                    },
                    {
                        path: "list-printer-scanner",
                        element: withSuspense(<PrinterScannerList />),
                    },
                    {
                        path: "search-printer-scanner/:code?",
                        element: withSuspense(<PrinterScannerSearch />),
                    },
                    {
                        path: "list-monitor",
                        element: withSuspense(<MonitorList />),
                    },
                    {
                        path: "search-monitor/:code?",
                        element: withSuspense(<MonitorSearch />),
                    },
                    {
                        path: "list-other",
                        element: withSuspense(<OtherList />),
                    },
                    {
                        path: "search-other/:code?",
                        element: withSuspense(<OtherSearch />),
                    },
                    {
                        path: "list-switch",
                        element: withSuspense(<SwitchList />),
                    },
                    {
                        path: "search-switch/:code?",
                        element: withSuspense(<SwitchSearch />),
                    },
                    {
                        path: "list-router",
                        element: withSuspense(<RouterList />),
                    },
                    {
                        path: "search-router/:code?",
                        element: withSuspense(<RouterSearch />),
                    },
                    {
                        path: "list-ups",
                        element: withSuspense(<UpsList />),
                    },
                    {
                        path: "search-ups/:code?",
                        element: withSuspense(<UpsSearch />),
                    },
                ]
            },
        ],
    },
];