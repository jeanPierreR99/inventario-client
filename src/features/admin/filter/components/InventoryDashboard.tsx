"use client"

import { API } from "@/lib/api"
import { PageTitle } from "@/shared/components/PageTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { useCallback, useEffect, useState, useMemo } from "react"
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts"
import { sedeData } from "@/data/sede_data"

// 🔹 Colores
const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6666",
    "#AA66CC",
    "#33B5E5",
    "#99CC00",
]

export default function InventoryDashboard() {
    const [data, setData] = useState<any>(null)

    // Filtros
    const [selectedSede, setSelectedSede] = useState<string>("")
    const [selectedGeneralOffice, setSelectedGeneralOffice] = useState<string>("")
    const [selectedOffice, setSelectedOffice] = useState<string>("")
    const [selectedUnit, setSelectedUnit] = useState<string>("")

    const [generalOffices, setGeneralOffices] = useState<any[]>([])
    const [offices, setOffices] = useState<any[]>([])
    const [units, setUnits] = useState<string[]>([])

    const buildQuery = useCallback(() => {
        if (selectedUnit) return selectedUnit
        if (selectedOffice) return selectedOffice
        if (selectedGeneralOffice) return selectedGeneralOffice
        if (selectedSede) return selectedSede
        return null
    }, [selectedUnit, selectedOffice, selectedGeneralOffice, selectedSede])

    const getTotal = useCallback(async () => {
        try {
            const query = buildQuery()
            if (query) {
                const response = await API.getTotalDashboard(query)
                setData(response.totals || null)
            }
        } catch (error) {
            console.error(error)
        }
    }, [buildQuery])

    useEffect(() => {
        getTotal()
    }, [getTotal])

    const chartData = useMemo(() => {
        if (!data) return []
        return Object.entries(data).map(([key, value]) => ({
            name: key,
            value: Number(value),
        }))
    }, [data])

    // 🔹 Handlers filtros
    const handleSedeChange = (value: string) => {
        setSelectedSede(value)
        setSelectedGeneralOffice("")
        setSelectedOffice("")
        setSelectedUnit("")
        setOffices([])
        setUnits([])
        const sede = sedeData.find(s => s.name === value)
        setGeneralOffices(sede?.generalOffices || [])
    }

    const handleGeneralOfficeChange = (value: string) => {
        setSelectedGeneralOffice(value)
        setSelectedOffice("")
        setSelectedUnit("")
        setUnits([])
        const sede = sedeData.find(s => s.name === selectedSede)
        const general = sede?.generalOffices?.find(g => g.name === value)
        setOffices(general?.offices || [])
    }

    const handleOfficeChange = (value: string) => {
        setSelectedOffice(value)
        setSelectedUnit("")
        const sede = sedeData.find(s => s.name === selectedSede)
        const general = sede?.generalOffices?.find(g => g.name === selectedGeneralOffice)
        const office = general?.offices?.find(o => o.name === value)
        setUnits(office?.units || [])
    }

    const handleUnitChange = (value: string) => {
        setSelectedUnit(value)
    }

    return (
        <div className="space-y-8">
            <PageTitle title="Inventario" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <Select value={selectedSede} onValueChange={handleSedeChange}>
                    <SelectTrigger className="border bg-white p-1 rounded w-sm">
                        <SelectValue placeholder="-- Seleccionar Sede --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {sedeData.map(s => (
                                <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={selectedGeneralOffice} onValueChange={handleGeneralOfficeChange} disabled={!generalOffices.length}>
                    <SelectTrigger className="border bg-white p-1 rounded w-sm">
                        <SelectValue placeholder="-- Seleccionar Oficina General --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {generalOffices.map(g => (
                                <SelectItem key={g.name} value={g.name}>{g.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={selectedOffice} onValueChange={handleOfficeChange} disabled={!offices.length}>
                    <SelectTrigger className="border bg-white p-1 rounded w-sm">
                        <SelectValue placeholder="-- Seleccionar Oficina --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {offices.map(o => (
                                <SelectItem key={o.name} value={o.name}>{o.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={selectedUnit} onValueChange={handleUnitChange} disabled={!units.length}>
                    <SelectTrigger className="border bg-white p-1 rounded w-sm">
                        <SelectValue placeholder="-- Seleccionar Unidad --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {units.map(u => (
                                <SelectItem key={u} value={u}>{u}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {chartData.length > 0 && (
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle>Inventario general (Barras)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {chartData.map((_entry, index) => (
                                        <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <LabelList
                                        dataKey="value"
                                        position="top"
                                        className="fill-gray-800 font-bold text-sm"
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>

                    </CardContent>
                </Card>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {chartData.map((item, index) => (
                    <Card key={item.name} className="shadow-md rounded-2xl">
                        <CardHeader>
                            <CardTitle className="capitalize">{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={[item]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={90}
                                        dataKey="value"
                                        label
                                    >
                                        <Cell fill={COLORS[index % COLORS.length]} />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <p className="text-center mt-2 text-lg font-semibold">{item.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
