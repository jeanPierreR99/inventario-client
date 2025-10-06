"use client"

import { useEffect, useState } from "react"
import { PageTitle } from "@/shared/components/PageTitle"
import { Button } from "@/shared/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card"
import { Search, Eye } from "lucide-react"
import { NavLink } from "react-router-dom"
import { API } from "@/lib/api"
import type { IOtiRouter } from "@/interface/IOtiRouter"
import type { IOtiSwitch } from "@/interface/IOtiSwitch"
import type { IOtiPrinterScanner } from "@/interface/IOtiPrinterScanner"
import type { IOtiComputer } from "@/interface/IOtiComputer"
import type { IOtiMonitor } from "@/interface/IOtiMonitor"
import type { OtiUps } from "@/interface/IOtiUps"
import type { IOtiOther } from "@/interface/IOtiOther"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { sedeData } from "@/data/sede_data"

interface IsearchAll {
    routers: IOtiRouter[],
    switchs: IOtiSwitch[],
    printers: IOtiPrinterScanner[],
    computers: IOtiComputer[],
    monitors: IOtiMonitor[],
    ups: OtiUps[],
    others: IOtiOther[],
}
const tables = [
    { key: "routers", label: "Routers", href: "/oti/search-router" },
    { key: "switchs", label: "Switches", href: "/oti/search-switch" },
    { key: "printers", label: "Impresoras / Escáneres", href: "/oti/search-printer-scanner" },
    { key: "computers", label: "Computadoras", href: "/oti/search-computer" },
    { key: "monitors", label: "Monitores", href: "/oti/search-monitor" },
    { key: "ups", label: "UPS", href: "/oti/search-ups" },
    { key: "others", label: "Otros equipos", href: "/oti/search-other" },
] as const

export function FilterPro() {
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState<IsearchAll>({
        routers: [],
        switchs: [],
        printers: [],
        computers: [],
        monitors: [],
        ups: [],
        others: [],
    })

    const handleData = async () => {
        try {
            const response = await API.searchAll(searchTerm)
            setData(response)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    const buildQuery = () => {
        if (selectedUnit) return selectedUnit
        if (selectedOffice) return selectedOffice
        if (selectedGeneralOffice) return selectedGeneralOffice
        if (selectedSede) return selectedSede
        return null
    }
    
    const handleDataOffice = async () => {
        const query = buildQuery()

        try {
            if (query) {
                const response = await API.searchAll(query)
                setData(response)
            } else {
                return
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    const [selectedSede, setSelectedSede] = useState<string>("")
    const [selectedGeneralOffice, setSelectedGeneralOffice] = useState<string>("")
    const [selectedOffice, setSelectedOffice] = useState<string>("")
    const [selectedUnit, setSelectedUnit] = useState<string>("")

    const [generalOffices, setGeneralOffices] = useState<any[]>([])
    const [offices, setOffices] = useState<any[]>([])
    const [units, setUnits] = useState<string[]>([])

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

    useEffect(() => {
        handleDataOffice()
    }, [selectedSede, selectedGeneralOffice, selectedOffice, selectedUnit])

    const handleUnitChange = (value: string) => { setSelectedUnit(value) }
    return (
        <div className="space-y-10">
            <PageTitle title="Filtro general de inventarios" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <Select value={selectedSede} onValueChange={handleSedeChange}>
                    <SelectTrigger className="border bg-white p-1 rounded w-sm">
                        <SelectValue placeholder="-- Seleccionar Sede --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {sedeData.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={selectedGeneralOffice} onValueChange={handleGeneralOfficeChange} disabled={!generalOffices.length}>
                    <SelectTrigger className="border bg-white p-1 rounded w-sm">
                        <SelectValue placeholder="-- Seleccionar Oficina General --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {generalOffices.map(g => <SelectItem key={g.name} value={g.name}>{g.name}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={selectedOffice} onValueChange={handleOfficeChange} disabled={!offices.length}>
                    <SelectTrigger className="border bg-white p-1 rounded w-sm">
                        <SelectValue placeholder="-- Seleccionar Oficina --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {offices.map(o => <SelectItem key={o.name} value={o.name}>{o.name}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={selectedUnit} onValueChange={handleUnitChange} disabled={!units.length}>
                    <SelectTrigger className="border bg-white p-1 rounded w-sm">
                        <SelectValue placeholder="-- Seleccionar Unidad --" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {units.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Buscador */}
            <div className="flex gap-4 items-center mb-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por Código patrimonial, IP, Mac, Denominación, N° Serie, modelo"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-3 py-1.5 border rounded w-full bg-white"
                    />
                </div>
                <Button onClick={handleData}>Buscar</Button>
            </div>

            {/* Tablas */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {tables.map(({ key, label, href }) => {
                    const items = data[key] || []
                    return (
                        <Card key={key} className="border-none">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-blue-700">{label}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto max-h-[500px]">
                                    <table className="min-w-full border text-xs">
                                        <thead className="bg-gray-100 text-gray-700 text-sm">
                                            <tr>
                                                <th className="px-4 py-2 text-left">Fecha</th>
                                                <th className="px-4 py-2 text-left">Ubicación</th>
                                                <th className="px-4 py-2 text-left">Código</th>
                                                <th className="px-4 py-2 text-left">Denominación</th>
                                                <th className="px-4 py-2 text-left">N° serie</th>
                                                <th className="px-4 py-2 text-left">Modelo</th>
                                                <th className="px-4 py-2 text-left">Estado</th>
                                                <th className="px-4 py-2 text-left">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.length > 0 ? (
                                                items.map((item) => (
                                                    <tr key={item.id} className="border-t hover:bg-gray-50">
                                                        <td className="px-4 py-2">{new Date(item.create_at!).toLocaleDateString()}</td>
                                                        <td className="px-4 py-2">
                                                            <div className="flex flex-col gap-1">
                                                                <div><strong>Sede:</strong> {item.sede || "-"}</div>
                                                                <div><strong>Oficina general:</strong> {item.generalOffice || "-"}</div>
                                                                <div><strong>Oficina:</strong> {item.office || "-"}</div>
                                                                <div><strong>Unidad:</strong> {item.unit || "-"}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <span className="bg-blue-100 text-nowrap text-blue-700 px-2 py-1 rounded-sm border border-blue-200">
                                                                {item.patrimonial_code}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {item.denomination}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <span className="bg-cyan-100 text-cyan-500 text-nowrap px-2 py-1 rounded-sm border border-cyan-200">
                                                                {item.serial_number}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <span className="bg-green-100 text-nowrap text-green-500 px-2 py-1 rounded-sm border border-green-200">
                                                                {item.model}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-2">{item.status}</td>
                                                        <td className="px-4 py-2">
                                                            <Button size="sm" variant="outline" className="p-0">
                                                                <NavLink target="_blank" className="p-2 flex items-center gap-1" to={`${href}/${item.patrimonial_code}`}>
                                                                    <Eye className="w-4 h-4" />
                                                                </NavLink>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                                                        No hay registros
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default FilterPro
