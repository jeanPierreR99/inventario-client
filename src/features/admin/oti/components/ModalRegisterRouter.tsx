"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

import { Router, Network, Loader } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import type { IRouter } from "@/interface/IRouter";
import { useEffect } from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

/* =========================
   🧠 VALIDACIÓN
========================= */
const routerSchema = z.object({
    name: z.string().min(3, "Nombre requerido"),
    ip: z.string().min(7, "IP inválida"),
    piso: z.string().min(1, "Seleccione piso"),
    segment: z.string().min(3, "Segmento requerido"),
});

type RouterFormValues = z.infer<typeof routerSchema>;

/* =========================
   🧩 PROPS
========================= */
type Props = {
    open: boolean;
    onOpenChange: () => void;
    onSubmit: (data: RouterFormValues, form: any) => void;
    loading: boolean;
    router: IRouter | null;
    onDelete: (id: string) => void;
};

/* =========================
   🚀 COMPONENTE
========================= */
const ModalRegisterRouter = ({ open, onOpenChange, onSubmit, loading, router, onDelete }: Props) => {

    const form = useForm<RouterFormValues>({
        resolver: zodResolver(routerSchema),
        defaultValues: {
            name: "",
            ip: "",
            piso: "",
            segment: "",
        },
    });

    const handleSubmit = (values: RouterFormValues) => {
        onSubmit(values, form);
    };


    useEffect(() => {
        if (!open) return;

        if (router) {
            form.reset(router);
            form.clearErrors();
        } else {
            form.reset({
                name: "",
                ip: "",
                piso: "",
                segment: "",
            });
        }
    }, [open, router]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-[420px] sm:w-[480px] p-0">

                <div className="flex flex-col h-full">

                    {/* 🔥 HEADER */}
                    <div className="p-6 border-b bg-muted/30">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-background shadow">
                                <Router className="w-7 h-7 text-blue-500" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">
                                    {router ? "Editar Router" : "Registrar Router"}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Configuración de red
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Badge className="bg-blue-500/10 text-blue-600">
                                router
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

                                {/* NAME */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Router Principal" {...field} />
                                            </FormControl>
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
                                            <FormLabel className="flex items-center gap-2">
                                                <Network className="w-4 h-4" />
                                                IP
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="192.168.0.1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* PISO */}
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="piso"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Piso</FormLabel>

                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-background shadow-sm w-full">
                                                            <SelectValue placeholder="Seleccionar piso" />
                                                        </SelectTrigger>
                                                    </FormControl>

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

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* SEGMENT */}
                                <FormField
                                    control={form.control}
                                    name="segment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Segmento de Red</FormLabel>
                                            <FormControl>
                                                <Input placeholder="192.168.1.0/24" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* BOTONES */}
                                <div className="flex gap-3 pt-4">
                                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600/90" disabled={loading}>
                                        {loading ? <div className="flex items-center gap-2"><Loader className="w-4 h-4 animate-spin" />{router ? "Actualizando..." : "Guardando..."}</div> : router ? "Actualizar Router" : "Guardar Router"}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className=""
                                        onClick={() => onOpenChange()}
                                    >
                                        Cancelar
                                    </Button>
                                </div>

                            </form>
                        </Form>
                    </div>
                    <DeleteConfirmation onConfirm={() => onDelete(router?.id!)} />
                </div>

            </SheetContent>
        </Sheet >
    );
};

export default ModalRegisterRouter;