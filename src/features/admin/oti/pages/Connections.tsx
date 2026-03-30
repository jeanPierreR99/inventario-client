import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import ModalNetwork from "../components/ModalNetwork";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import ModalRegisterRouter from "../components/ModalRegisterRouter";
import ModalRegisterDevice from "../components/ModalRegisterDevice";
import { API } from "@/lib/api";
import { AlertMessage } from "@/features/login/components/AlertMessage";
import type { IDevice } from "@/interface/IDevice";
import type { IRouter } from "@/interface/IRouter";
import { BrushCleaning } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

type Device = {
    id: string;
    type: "router" | "pc" | "printer";
    label: string;
    office?: string;
    piso?: string;
    routerId?: string;
    name?: string;
    mac?: string;
    segment?: string;
    ip: string;
};

type DeviceWithPosition = Device & {
    x: number;
    y: number;
};

type Connection = {
    source: string;
    target: string;
};

export default function Connections() {
    const ref = useRef<SVGSVGElement | null>(null);
    const [seledted, setSeledted] = useState<any | null>(null);
    const [modalRouter, setModalRouter] = useState<boolean>(false);
    const [modalEquipo, setModalEquipo] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);
    const [piso, setPiso] = useState<string>("Primer piso");
    const [editDevice, setEditDevice] = useState<Device | null>(null);
    const [rawDevices, setRawDevices] = useState<Device[]>([]);
    const [editRouter, setEditRouter] = useState<IRouter | null>(null);



    const handleRegisterRouter = async (data: IRouter, form: any) => {
        setLoading(true);
        if (editRouter) {
            try {
                const response = await API.updateRouter(editRouter.id!, data);
                console.log(response);
                form.reset();
                setModalRouter(false);
                setAlert({ message: "Router actualizado exitosamente", type: "success" });
                fetchData();
            } catch (error: any) {
                console.log(error);
                setAlert({ message: error.response?.data?.message || "Error al actualizar el router", type: "error" });
            } finally {
                setLoading(false);
            }
        }
        else {
            try {
                const response = await API.saveRouter(data);
                console.log(response);
                form.reset();
                setModalRouter(false);
                setAlert({ message: "Router registrado exitosamente", type: "success" });
                fetchData();
            } catch (error: any) {
                console.log(error);
                setAlert({ message: error.response?.data?.message || "Error al registrar el router", type: "error" });
            } finally {
                setLoading(false);
            }
        };
    }

    const handleRegisterDevice = async (data: IDevice, form: any) => {
        setLoading(true);

        if (editDevice) {
            try {
                console.log(data)
                const response = await API.updateDevices(editDevice.id, data);
                console.log(response);
                form.reset();
                setModalEquipo(false);
                setAlert({ message: "Equipo actualizado exitosamente", type: "success" });
                fetchData();
            } catch (error: any) {
                console.log(error);
                setAlert({ message: error.response?.data?.message || "Error al actualizar el equipo", type: "error" });
            } finally {
                setLoading(false);
            }
        }
        else {
            try {
                console.log(data)
                const response = await API.saveDevices(data);
                console.log(response);
                form.reset();
                setModalEquipo(false);
                setAlert({ message: "Equipo registrado exitosamente", type: "success" });
                fetchData();
            } catch (error: any) {
                console.log(error);
                setAlert({ message: error.response?.data?.message || "Error al registrar el equipo", type: "error" });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteRouter = async (id: string) => {
        setLoading(true);
        try {
            const response = await API.deleteRouter(id);
            console.log(response);
            setAlert({ message: "Router eliminado exitosamente", type: "success" });
            fetchData();
        } catch (error: any) {
            console.log(error);
            setAlert({ message: error.response?.data?.message || "Error al eliminar el router", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDevice = async (id: string) => {
        setLoading(true);
        try {
            const response = await API.deleteDevices(id);
            console.log(response);
            setAlert({ message: "Equipo eliminado exitosamente", type: "success" });
            fetchData();
        } catch (error: any) {
            console.log(error);
            setAlert({ message: error.response?.data?.message || "Error al eliminar el router", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const [ip, setIp] = useState<string | null>(null);

    const filteredDevices = rawDevices.filter(device => {
        if (!ip) return true;

        if (device.type === "router") return true;

        return device.ip.includes(ip);
    });

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();
        if (!rawDevices.length) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        svg.attr("width", width).attr("height", height);

        /* =========================
           🏢 CONFIG
        ========================= */
        const OFFICE_WIDTH = 460;
        const GAP = 20;
        const START_Y = 200;

        /* =========================
           🧠 OFICINAS DINÁMICAS
        ========================= */


        const officeNames = Array.from(
            new Set(filteredDevices.filter(d => d.office).map(d => d.office))
        );
        const COLUMN_COUNT = Math.max(1, Math.floor(width / (OFFICE_WIDTH + GAP))); 8
        const columnHeights = new Array(COLUMN_COUNT).fill(START_Y);

        const rooms = officeNames.map((name) => {
            const list = filteredDevices.filter(d => d.office === name);

            const pcs = list.filter(d => d.type === "pc");
            const printers = list.filter(d => d.type === "printer");

            const rows = Math.ceil((pcs.length + printers.length) / 4);

            const dynamicHeight = 80 + rows * 70 + 60;

            const colIndex = columnHeights.indexOf(Math.min(...columnHeights));

            const x = 20 + colIndex * (OFFICE_WIDTH + GAP);
            const y = columnHeights[colIndex];

            columnHeights[colIndex] += dynamicHeight + GAP;

            return {
                name,
                x,
                y,
                w: OFFICE_WIDTH,
                h: dynamicHeight,
            };
        });

        const maxWidth = d3.max(rooms, r => r.x + r.w) || width;
        const maxHeight = d3.max(rooms, r => r.y + r.h) || height;

        svg
            .attr("width", maxWidth)
            .attr("height", maxHeight);

        /* =========================
           🧠 GENERAR POSICIONES
        ========================= */
        const devices: DeviceWithPosition[] = [];

        // Router
        const routers = filteredDevices.filter(d => d.type === "router");

        routers.forEach((router, i) => {
            devices.push({
                ...router,
                x: width / 2 + i * 190 - (routers.length * 60),
                y: 80,
            });
        });

        rooms.forEach(room => {
            const list = filteredDevices.filter(d => d.office === room.name);

            const pcs = list.filter(d => d.type === "pc");
            const printers = list.filter(d => d.type === "printer");

            const padding = 20;

            const cols = 4;
            const spacingX = (room.w - padding * 2) / cols;
            const spacingY = 70;

            /* 🖥️ PCs */
            pcs.forEach((dev, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);

                devices.push({
                    ...dev,
                    x: room.x + padding + col * spacingX + spacingX / 2,
                    y: room.y + padding + row * spacingY + 40,
                });
            });

            const pcRows = Math.ceil(pcs.length / cols);

            printers.forEach((dev, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols) + pcRows;

                devices.push({
                    ...dev,
                    x: room.x + padding + col * spacingX + spacingX / 2,
                    y: room.y + padding + row * spacingY + 40,
                });
            });
        });

        /* =========================
           🔗 CONEXIONES
        ========================= */
        const connections: Connection[] = devices
            .filter(d => d.type !== "router" && d.routerId)
            .map(d => ({
                source: d.routerId!,
                target: d.id,
            }));

        // connections.push(
        //     { source: "r1", target: "r2" }
        // );

        function drawConnections() {
            const links = svg
                .selectAll<SVGLineElement, Connection>(".link")
                .data(connections, (d: any) => `${d.source}-${d.target}`);

            // ENTER
            links.enter()
                .append("line")
                .attr("class", "link")
                .merge(links as any)
                .attr("x1", d => devices.find(dev => dev.id === d.source)!.x)
                .attr("y1", d => devices.find(dev => dev.id === d.source)!.y)
                .attr("x2", d => devices.find(dev => dev.id === d.target)!.x)
                .attr("y2", d => devices.find(dev => dev.id === d.target)!.y)
                .attr("stroke", "#0ea5e9")
                .attr("stroke-width", 2);

            // EXIT
            links.exit().remove();
        }

        /* =========================
           🏢 DIBUJAR OFICINAS
        ========================= */
        rooms.forEach(room => {
            const g = svg.append("g");

            // 🔲 Contenedor principal
            g.append("rect")
                .attr("x", room.x)
                .attr("y", room.y)
                .attr("width", room.w)
                .attr("height", room.h)
                .attr("rx", 14)
                .attr("fill", "#f8fafc") // más limpio que gris plano
                .attr("stroke", "#cbd5f5")
                .attr("stroke-width", 1.2)
                .attr("filter", "drop-shadow(0px 4px 6px rgba(0,0,0,0.08))");

            // 🔝 HEADER (barra superior)
            g.append("rect")
                .attr("x", room.x)
                .attr("y", room.y)
                .attr("width", room.w)
                .attr("height", 36)
                .attr("rx", 14)
                .attr("fill", "#e2e8f0");

            // 🔻 corregir bordes del header (para que no redondee abajo)
            g.append("rect")
                .attr("x", room.x)
                .attr("y", room.y + 18)
                .attr("width", room.w)
                .attr("height", 18)
                .attr("fill", "#e2e8f0");

            // 🏷️ Título
            g.append("text")
                .attr("x", room.x + 16)
                .attr("y", room.y + 23)
                .attr("text-anchor", "start")
                .attr("font-size", 13)
                .attr("font-weight", "600")
                .attr("fill", "#1e293b")
                .text(room.name!);

            // 📊 Subtexto (detalle)
            const totalDevices = filteredDevices.filter(d => d.office === room.name).length;

            g.append("text")
                .attr("x", room.x + room.w - 16)
                .attr("y", room.y + 23)
                .attr("text-anchor", "end")
                .attr("font-size", 11)
                .attr("fill", "#64748b")
                .text(`${totalDevices} dispositivos`);
        });

        drawConnections();

        /* =========================
           🎯 NODOS
        ========================= */
        const node = svg.selectAll(".node")
            .data(devices)
            .enter()
            .append("g")
            .attr("transform", d => `translate(${d.x}, ${d.y})`);

        node.each(function (d) {
            const g = d3.select(this);

            if (d.type === "printer") {
                // 🧱 cuerpo
                g.append("rect")
                    .attr("x", -16)
                    .attr("y", -8)
                    .attr("width", 32)
                    .attr("height", 18)
                    .attr("rx", 3)
                    .attr("fill", "#475569");

                // 📄 papel saliendo
                g.append("rect")
                    .attr("x", -8)
                    .attr("y", -18)
                    .attr("width", 16)
                    .attr("height", 10)
                    .attr("fill", "#ffffff")
                    .attr("stroke", "#cbd5f5")
                    .attr("stroke-width", 1);

                // 📄 líneas del papel
                for (let i = -6; i <= 4; i += 4) {
                    g.append("line")
                        .attr("x1", -6)
                        .attr("y1", i - 18)
                        .attr("x2", 6)
                        .attr("y2", i - 18)
                        .attr("stroke", "#94a3b8")
                        .attr("stroke-width", 0.5);
                }

                // 📤 bandeja salida
                g.append("rect")
                    .attr("x", -12)
                    .attr("y", 10)
                    .attr("width", 24)
                    .attr("height", 4)
                    .attr("rx", 1)
                    .attr("fill", "#334155");

                // 🔘 botón
                g.append("circle")
                    .attr("cx", 10)
                    .attr("cy", -2)
                    .attr("r", 2)
                    .attr("fill", "#22c55e");

                // ✨ sombra
                g.append("rect")
                    .attr("x", -14)
                    .attr("y", 12)
                    .attr("width", 28)
                    .attr("height", 3)
                    .attr("fill", "#000")
                    .attr("opacity", 0.1);
            }

            if (d.type === "pc") {
                // 🖥️ Monitor marco
                g.append("rect")
                    .attr("x", -18)
                    .attr("y", -15)
                    .attr("width", 36)
                    .attr("height", 24)
                    .attr("rx", 4)
                    .attr("fill", "#0f172a");

                // 🖥️ Pantalla
                g.append("rect")
                    .attr("x", -15)
                    .attr("y", -12)
                    .attr("width", 30)
                    .attr("height", 18)
                    .attr("rx", 2)
                    .attr("fill", "#38bdf8");

                // ✨ brillo pantalla
                g.append("rect")
                    .attr("x", -15)
                    .attr("y", -12)
                    .attr("width", 30)
                    .attr("height", 6)
                    .attr("fill", "#7dd3fc")
                    .attr("opacity", 0.3);

                // 🧱 Base monitor
                g.append("rect")
                    .attr("x", -4)
                    .attr("y", 9)
                    .attr("width", 8)
                    .attr("height", 4)
                    .attr("fill", "#1e293b");

                // ⌨️ teclado
                g.append("rect")
                    .attr("x", -10)
                    .attr("y", 14)
                    .attr("width", 20)
                    .attr("height", 4)
                    .attr("rx", 1)
                    .attr("fill", "#334155");

                // 🖱️ mouse
                g.append("circle")
                    .attr("cx", 12)
                    .attr("cy", 16)
                    .attr("r", 2)
                    .attr("fill", "#475569");

                // 🧊 CPU torre
                g.append("rect")
                    .attr("x", 19)
                    .attr("y", -10)
                    .attr("width", 10)
                    .attr("height", 22)
                    .attr("rx", 1)
                    .attr("fill", "#1e293b");

                // 💡 LED CPU
                g.append("circle")
                    .attr("cx", 22)
                    .attr("cy", 6)
                    .attr("r", 1.5)
                    .attr("fill", "#22c55e");
            }

            if (d.type === "router") {
                // 🧱 Cuerpo principal
                g.append("rect")
                    .attr("x", -30)
                    .attr("y", -12)
                    .attr("width", 60)
                    .attr("height", 24)
                    .attr("rx", 8)
                    .attr("fill", "#1e40af");

                // 💡 LEDs
                const leds = [-18, -6, 6, 18];
                leds.forEach(x => {
                    g.append("circle")
                        .attr("cx", x)
                        .attr("cy", 0)
                        .attr("r", 2.5)
                        .attr("fill", "#22c55e");
                });

                // 📡 Antena izquierda
                g.append("line")
                    .attr("x1", -20)
                    .attr("y1", -12)
                    .attr("x2", -25)
                    .attr("y2", -30)
                    .attr("stroke", "#0f172a")
                    .attr("stroke-width", 2);

                // 📡 Antena derecha
                g.append("line")
                    .attr("x1", 20)
                    .attr("y1", -12)
                    .attr("x2", 25)
                    .attr("y2", -30)
                    .attr("stroke", "#0f172a")
                    .attr("stroke-width", 2);

                // 🔌 Puertos (LAN)
                for (let i = -18; i <= 18; i += 9) {
                    g.append("rect")
                        .attr("x", i)
                        .attr("y", 6)
                        .attr("width", 6)
                        .attr("height", 4)
                        .attr("rx", 1)
                        .attr("fill", "#020617");
                }

                // ✨ Sombra ligera
                g.append("rect")
                    .attr("x", -28)
                    .attr("y", 10)
                    .attr("width", 56)
                    .attr("height", 4)
                    .attr("rx", 2)
                    .attr("fill", "#000")
                    .attr("opacity", 0.1);

                g.append("text")
                    .text(d.label)
                    .attr("y", -30)
                    .attr("text-anchor", "middle")
                    .attr("font-size", 10);

                g.append("text")
                    .text(d.ip)
                    .attr("y", -45)
                    .attr("text-anchor", "middle")
                    .attr("font-size", 10);
                return
            }

            g.append("text")
                .text(d.label)
                .attr("y", 30)
                .attr("text-anchor", "middle")
                .attr("font-size", 10);

            g.append("text")
                .text(d.ip)
                .attr("y", 45)
                .attr("text-anchor", "middle")
                .attr("font-size", 10);
        });

        /* =========================
           DRAG
        ========================= */
        node.call(
            d3.drag<any, DeviceWithPosition>()
                .on("drag", function (event, d) {
                    d.x = event.x;
                    d.y = event.y;

                    d3.select(this)
                        .attr("transform", `translate(${d.x}, ${d.y})`);

                    drawConnections();
                })
        );
        let pressTimer: any = null;

        node.on("click", function (_event, d) {
            setSeledted(d)
            d3.selectAll(".node").classed("selected", false);
            d3.select(this).classed("selected", true);

            d3.selectAll(".link")
                .attr("stroke", (l: any) =>
                    l.source === d.id || l.target === d.id
                        ? "#ef4444"
                        : "#94a3b8"
                );
        })
            .on("pointerdown", function (_event, d: any) {
                pressTimer = setTimeout(() => {
                    if (d.type !== "router") {
                        setModalEquipo(true)
                        setEditDevice(d)
                        return
                    }

                    setModalRouter(true)
                    setEditRouter(d)

                }, 800);
            })
            .on("pointerup pointerleave", function () {
                clearTimeout(pressTimer);
            });

    }, [ip, rawDevices]);


    const fetchData = async () => {
        try {
            const routers = await API.getAllDataRoutersByPiso(piso);

            const mapped: Device[] = [];

            routers.forEach((router: any) => {
                // 🔵 Router
                mapped.push({
                    id: router.id,
                    name: router.name,
                    segment: router.segment,
                    type: "router",
                    label: router.name,
                    piso: router.piso,
                    ip: router.ip,
                });

                // 🟢 Devices del router
                router.devices.forEach((dev: any) => {
                    mapped.push({
                        id: dev.id,
                        name: dev.name,
                        type: dev.type, // "pc" | "printer"
                        label: dev.name,
                        office: dev.office,
                        ip: dev.ip,
                        mac: dev.mac,
                        routerId: router.id, // 🔥 clave
                    });
                });
            });

            setRawDevices(mapped);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [piso]);

    return (
        <div className="space-y-6">

            {/* 🔝 HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-xl font-semibold">Topología de Red</h1>
                    <p className="text-sm text-muted-foreground">
                        Visualización de dispositivos por oficina
                    </p>
                </div>

                {/* 🎛️ FILTRO */}
                <div className="w-full md:w-[260px]">
                    <Select value={piso} onValueChange={(value) => setPiso(value)}>
                        <SelectTrigger className="bg-background shadow-sm">
                            <SelectValue placeholder="Seleccionar piso" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Primer piso">Primer piso</SelectItem>
                                <SelectItem value="Segundo piso">Segundo piso</SelectItem>
                                <SelectItem value="Tercer piso">Tercer piso</SelectItem>
                                <SelectItem value="Cuarto piso">Cuarto piso</SelectItem>
                                <SelectItem value="Quinto piso">Quinto piso</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant={"outline"} onClick={() => setModalRouter(true)}>Agregar Router</Button>
                <Button variant={"outline"} onClick={() => setModalEquipo(true)}>Agregar PC/Impresora</Button>
            </div>

            {alert && <AlertMessage message={alert.message} type={alert.type} />}

            <div className="relative rounded-2xl border bg-background shadow-sm w-[82vw] mx-auto">

                <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
                    <span className="text-sm font-medium">
                        Mapa de red
                    </span>
                    <Input
                        placeholder="Buscar IP"
                        className=" bg-white w-md"
                        value={ip || ""}
                        onChange={(e) => setIp(e.target.value.trim())} />
                    <span className="text-xs text-muted-foreground">
                        Arrastra los nodos para reorganizar
                    </span>
                </div>

                <div className="p-4 overflow-hidden">
                    <div className="pb-4 rounded-lg bg-slate-100 overflow-x-auto">
                        {filteredDevices.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center space-y-3 w-fit mx-auto h-fit my-26 p-4 border-dashed border-2 border-gray-300 rounded-lg">
                                <BrushCleaning className="h-12 w-12 text-gray-300" />

                                <div>
                                    <p className="text-sm font-medium">No hay dispositivos registrados</p>
                                    <p className="text-xs text-muted-foreground">
                                        Agrega routers o equipos para visualizar la red
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <svg
                                ref={ref}
                                className="w-full"
                            />
                        )}
                    </div>
                </div>
            </div>

            {seledted && (
                <ModalNetwork
                    onOpenChange={() => setSeledted(null)}
                    device={seledted}
                />
            )}
            <ModalRegisterRouter
                open={modalRouter}
                onOpenChange={() => {
                    setModalRouter(false)
                    setEditRouter(null)
                }}
                onSubmit={handleRegisterRouter}
                loading={loading}
                router={editRouter}
                onDelete={handleDeleteRouter}
            />
            <ModalRegisterDevice
                open={modalEquipo}
                onOpenChange={() => {
                    setModalEquipo(false)
                    setEditDevice(null)
                }}
                onSubmit={handleRegisterDevice}
                loading={loading}
                device={editDevice}
                onDelete={handleDeleteDevice}
            />
        </div>
    );
}
