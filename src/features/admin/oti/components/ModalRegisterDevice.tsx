"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

import {
    Sheet,
    SheetContent,
} from "@/shared/components/ui/sheet";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

import {
    Monitor,
    Router as RouterIcon,
    Network,
    MapPin,
    Loader,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import { API } from "@/lib/api";
import type { IRouter } from "@/interface/IRouter";
import type { IDevice } from "@/interface/IDevice";
import { DeleteConfirmation } from "./DeleteConfirmation";

/* =========================
   🧠 VALIDACIÓN
========================= */
const deviceSchema = z.object({
    name: z.string().min(3, "Nombre requerido"),
    type: z.enum(["pc", "printer"]),
    ip: z.string().min(7, "IP inválida"),
    office: z.string().min(2, "Oficina requerida"), // solo display
    officeId: z.string().min(1, "Seleccione una oficina válida"), // 🔥 clave
    mac: z.string().min(10, "MAC inválida"),
    routerId: z.string().min(1, "Seleccione router"),
});

type DeviceFormValues = z.infer<typeof deviceSchema>;

/* =========================
   🧩 PROPS
========================= */
type Props = {
    open: boolean;
    onOpenChange: () => void;
    onSubmit: (data: IDevice, form: any) => void;
    loading: boolean;
    device?: any | null;
    onDelete: (id: string) => void;
};

/* =========================
   🚀 COMPONENTE
========================= */
const ModalRegisterDevice = ({ open, onOpenChange, onSubmit, loading, device, onDelete }: Props) => {

    const [routers, setRouters] = useState<IRouter[]>([]);
    const [offices, setOffices] = useState<string[]>([]);
    const [loadingOffice, setLoadingOffice] = useState(false);

    const form = useForm<DeviceFormValues>({
        resolver: zodResolver(deviceSchema),
        defaultValues: {
            name: "",
            type: "pc",
            ip: "",
            office: "",
            officeId: "", // 🔥 nuevo
            mac: "",
            routerId: "",
        },
    });

    let timeout: any;
    const handleSearchOffice = (value: string) => {
        form.setValue("office", value);
        form.setValue("officeId", "");
        form.setError("officeId", {
            type: "manual",
            message: "Seleccione una oficina de la lista",
        });
        if (timeout) clearTimeout(timeout);

        if (value.length <= 2) {
            setOffices([]);
            return;
        }

        timeout = setTimeout(async () => {
            try {
                setLoadingOffice(true);
                const response = await API.getAllOfficeByName(value);
                setOffices(response || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingOffice(false);
            }
        }, 400);
    };

    const handleSubmit = (values: DeviceFormValues) => {
        const { officeId, ...rest } = values;
        onSubmit(rest, form);
    };

    const handleRouter = async () => {
        try {
            const response = await API.getAllDataRouters();
            setRouters(response || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!open) return;

        if (device) {
            form.reset(device);
            form.setValue("officeId", "11111111");

            form.clearErrors();
        } else {
            form.reset({
                name: "",
                type: "pc",
                ip: "",
                office: "",
                officeId: "",
                mac: "",
                routerId: "",
            });
        }

        handleRouter();
    }, [open, device]);



    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-[420px] sm:w-[480px] p-0">

                <div className="flex flex-col h-full">

                    {/* 🔥 HEADER */}
                    <div className="p-6 border-b bg-muted/30">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-background shadow">
                                <Monitor className="w-7 h-7 text-green-500" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">
                                    {device ? "Editar Dispositivo" : "Registrar Dispositivo"}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {device ? "Editar equipo" : "Agregar equipo"} a la red
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Badge className="bg-green-500/10 text-green-600">
                                device
                            </Badge>
                        </div>
                    </div>

                    {/* 🔹 FORM */}
                    <div className="flex-1 overflow-y-auto p-6">

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="space-y-6"
                            >

                                {/* NOMBRE */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="PC Oficina" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* TIPO */}
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo</FormLabel>

                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    <SelectItem value="pc">PC</SelectItem>
                                                    <SelectItem value="printer">Printer</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* IP */}
                                <FormField
                                    control={form.control}
                                    name="ip"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex gap-2 items-center">
                                                <Network className="w-4 h-4" />
                                                IP
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="192.168.x.x" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* MAC */}
                                <FormField
                                    control={form.control}
                                    name="mac"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>MAC</FormLabel>
                                            <FormControl>
                                                <Input placeholder="00:1A:2B:3C:4D:5E" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* OFICINA */}
                                <input type="hidden" {...form.register("officeId")} />
                                <FormField
                                    control={form.control}
                                    name="office"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel className="flex gap-2 items-center">
                                                <MapPin className="w-4 h-4" />
                                                Oficina
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="Buscar oficina..."
                                                    value={field.value}
                                                    onChange={(e) => handleSearchOffice(e.target.value)}
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {form.formState.errors.officeId?.message}
                                            </FormMessage>
                                            {/* 🔥 DROPDOWN AUTOCOMPLETE */}
                                            {offices.length > 0 && (
                                                <div className="absolute top-15 z-50 mt-1 w-full bg-background border rounded-md shadow-md max-h-60 overflow-y-auto">

                                                    {loadingOffice && (
                                                        <div className="p-2 text-sm text-muted-foreground">
                                                            Buscando...
                                                        </div>
                                                    )}

                                                    {!loadingOffice && offices.map((office: any, i) => (
                                                        <div
                                                            key={i}
                                                            onClick={() => {
                                                                form.setValue("office", office.name);
                                                                form.setValue("officeId", office.id); // 🔥 AQUÍ ESTÁ LA CLAVE
                                                                setOffices([]);
                                                            }}
                                                            className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                                                        >
                                                            {office.name + " (" + office.siglas + ")"}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* ROUTER */}
                                <FormField
                                    control={form.control}
                                    name="routerId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex gap-2 items-center">
                                                <RouterIcon className="w-4 h-4" />
                                                Router
                                            </FormLabel>

                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar router" />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    <SelectGroup>
                                                        {routers.map(r => (
                                                            <SelectItem key={r.id} value={r.id!}>
                                                                <span className="font-semibold">{r.piso}</span> - {r.ip} ({r.name})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* BOTONES */}
                                <div className="flex gap-3 pt-4">
                                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600/90" disabled={loading}>
                                        {loading ? <div className="flex items-center gap-2"><Loader className="w-4 h-4 animate-spin" />{device ? "Actualizando..." : "Guardando..."}</div> : device ? "Actualizar Dispositivo" : "Guardar Dispositivo"}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => onOpenChange()}
                                    >
                                        Cancelar
                                    </Button>
                                </div>

                            </form>
                        </Form>

                    </div>
                    <DeleteConfirmation onConfirm={() => onDelete(device?.id!)} />
                </div>

            </SheetContent>
        </Sheet>
    );
};

export default ModalRegisterDevice;