"use client";

import {
    Sheet,
    SheetContent,
} from "@/shared/components/ui/sheet";
import { Badge } from "@/shared/components/ui/badge";
import {
    Monitor,
    Router,
    Printer,
    MapPin,
    Network,
    Activity,
    Cpu,
    ShieldCheck,
} from "lucide-react";

type Device = {
    id: string;
    type: "router" | "pc" | "printer";
    label: string;
    office?: string;
    piso?: string;
    ip: string;
    segment?: string;
    mac?: string;
};

type Props = {
    onOpenChange: (open: boolean) => void;
    device: Device | null;
};

/* =========================
   🎨 HELPERS
========================= */
const getIcon = (type: Device["type"]) => {
    switch (type) {
        case "router":
            return <Router className="w-7 h-7 text-blue-500" />;
        case "printer":
            return <Printer className="w-7 h-7 text-purple-500" />;
        default:
            return <Monitor className="w-7 h-7 text-green-500" />;
    }
};

const getTypeColor = (type: Device["type"]) => {
    switch (type) {
        case "router":
            return "bg-blue-500/10 text-blue-600";
        case "printer":
            return "bg-purple-500/10 text-purple-600";
        default:
            return "bg-green-500/10 text-green-600";
    }
};

const InfoRow = ({ label, value, icon }: any) => (
    <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground flex items-center gap-2">
            {icon}
            {label}
        </span>
        <span className="font-medium text-right">{value}</span>
    </div>
);

/* =========================
   🚀 COMPONENTE
========================= */
const ModalNetwork = ({ onOpenChange, device }: Props) => {
    return (
        <Sheet open={!!device} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-[420px] sm:w-[480px] p-0">

                {device && (
                    <div className="flex flex-col h-full">

                        {/* 🔥 HEADER */}
                        <div className="p-6 border-b bg-gradient-to-br from-muted/40 to-muted/10">
                            <div className="flex items-center gap-4">

                                <div className="p-3 rounded-2xl bg-background shadow-md">
                                    {getIcon(device.type)}
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold leading-none">
                                        {device.label}
                                    </h2>
                                    <p className="text-sm text-muted-foreground mt-1 font-mono">
                                        {device.ip}
                                    </p>
                                </div>

                                {/* 🟢 STATUS */}
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-sm text-green-600 font-medium">
                                        Online
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Badge className={`${getTypeColor(device.type)} capitalize`}>
                                    {device.type}
                                </Badge>
                                {device.segment && (
                                    <Badge variant="outline">
                                        {device.segment}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* 🔹 CONTENT */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">

                            {/* 🧾 INFO */}
                            <div className="rounded-2xl border bg-background shadow-sm">
                                <div className="p-4 border-b">
                                    <h3 className="text-sm font-semibold">
                                        Información del Dispositivo
                                    </h3>
                                </div>

                                <div className="p-4 space-y-3">

                                    <InfoRow
                                        label="ID"
                                        value={device.id}
                                        icon={<ShieldCheck className="w-4 h-4" />}
                                    />

                                    <InfoRow
                                        label="IP"
                                        value={<span className="font-mono">{device.ip}</span>}
                                        icon={<Network className="w-4 h-4" />}
                                    />

                                    {device.mac && (
                                        <InfoRow
                                            label="MAC"
                                            value={device.mac}
                                            icon={<Cpu className="w-4 h-4" />}
                                        />
                                    )}

                                    {device.office && (
                                        <InfoRow
                                            label="Oficina"
                                            value={device.office}
                                            icon={<MapPin className="w-4 h-4" />}
                                        />
                                    )}

                                    {device.piso && (
                                        <InfoRow
                                            label="Piso"
                                            value={device.piso}
                                            icon={<MapPin className="w-4 h-4" />}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* 📊 MÉTRICAS */}
                            <div className="rounded-2xl border bg-background shadow-sm">
                                <div className="p-4 border-b flex items-center gap-2">
                                    <Activity className="w-4 h-4" />
                                    <h3 className="text-sm font-semibold">
                                        Métricas en Tiempo Real
                                    </h3>
                                </div>

                                <div className="p-4 grid grid-cols-2 gap-4">

                                    <MetricCard
                                        label="Latencia"
                                        value="12 ms"
                                        color="text-green-600"
                                    />

                                    <MetricCard
                                        label="Paquetes"
                                        value="98%"
                                    />

                                    <MetricCard
                                        label="Uptime"
                                        value="3h 21m"
                                    />

                                    <MetricCard
                                        label="Estado"
                                        value="Estable"
                                        color="text-green-600"
                                    />

                                </div>
                            </div>

                        </div>

                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

/* =========================
   📊 METRIC CARD
========================= */
const MetricCard = ({ label, value, color }: any) => (
    <div className="p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-lg font-semibold ${color || ""}`}>
            {value}
        </p>
    </div>
);

export default ModalNetwork;