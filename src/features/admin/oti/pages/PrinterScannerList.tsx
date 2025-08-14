import { useEffect, useRef, useState } from "react"
import type { IOtiPrinterScanner } from "@/interface/IOtiPrinterScanner"
import { API } from "@/lib/api"
import { Button } from "@/shared/components/ui/button"
import { Eye, ArrowBigUpDash } from "lucide-react"
import { PageTitle } from "@/shared/components/PageTitle"
import { NavLink } from "react-router-dom"
import { sedeData } from "@/data/sede_data"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"

const LIMIT = 10

const PrinterScannerList = () => {
    const [printers, setPrinters] = useState<IOtiPrinterScanner[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const observerRef = useRef<HTMLDivElement | null>(null)

    const [selectedSede, setSelectedSede] = useState<string>("")
    const [selectedGeneralOffice, setSelectedGeneralOffice] = useState<string>("")
    const [selectedOffice, setSelectedOffice] = useState<string>("")
    const [selectedUnit, setSelectedUnit] = useState<string>("")

    const [generalOffices, setGeneralOffices] = useState<any[]>([])
    const [offices, setOffices] = useState<any[]>([])
    const [units, setUnits] = useState<string[]>([])

    const buildQuery = () => {
        if (selectedUnit) return selectedUnit
        if (selectedOffice) return selectedOffice
        if (selectedGeneralOffice) return selectedGeneralOffice
        if (selectedSede) return selectedSede
        return null
    }

    const fetchPrinters = async (currentPage: number) => {
        if (loading) return
        setLoading(true)
        try {
            const query = buildQuery()
            if (query) {
                const data = await API.getAllDataFilterOtiPrinterScanner(query)
                setPrinters(data)
                setHasMore(false)
            } else {
                const response = await API.getAllDataOtiPrinterScanner(currentPage, LIMIT)
                const data = response.data || response
                setPrinters(prev => (currentPage === 1 ? data : [...prev, ...data]))
                setHasMore(data.length === LIMIT)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setPage(1)
        setHasMore(true)
        setPrinters([])
    }, [selectedSede, selectedGeneralOffice, selectedOffice, selectedUnit])

    useEffect(() => {
        if (!hasMore || loading) return
        const observer = new IntersectionObserver(
            entries => { if (entries[0].isIntersecting) setPage(prev => prev + 1) },
            { rootMargin: "200px" }
        )
        if (observerRef.current) observer.observe(observerRef.current)
        return () => observer.disconnect()
    }, [hasMore, loading])

    useEffect(() => { fetchPrinters(page) }, [page])

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
        const office = general?.offices.find(o => o.name === value)
        setUnits(office?.units || [])
    }

    const handleUnitChange = (value: string) => { setSelectedUnit(value) }

    return (
        <div>
            <PageTitle title="Lista de impresoras y escáneres" />

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

            <Button
                variant="outline"
                className="mb-4"
                onClick={() => {
                    setSelectedSede("")
                    setSelectedGeneralOffice("")
                    setSelectedOffice("")
                    setSelectedUnit("")
                    setPage(1)
                    setHasMore(true)
                    setPrinters([])
                }}
            >
                <ArrowBigUpDash /> Refrescar
            </Button>

            <div className="overflow-x-auto bg-white">
                <table className="min-w-full text-xs">
                    <thead className="bg-gray-100 text-sm">
                        <tr>
                            <th className="px-4 py-2 text-left">Fecha de registro</th>
                            <th className="px-4 py-2 text-left">Ubicación</th>
                            <th className="px-4 py-2 text-left">Código</th>
                            <th className="px-4 py-2 text-left">Tipo</th>
                            <th className="px-4 py-2 text-left">IP</th>
                            <th className="px-4 py-2 text-left">Estado</th>
                            <th className="px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {printers.map(item => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{item.create_at ? new Date(item.create_at).toLocaleDateString() : "-"}</td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-col gap-1">
                                        <div><strong>Sede:</strong> {item.sede || "-"}</div>
                                        <div><strong>Oficina general:</strong> {item.generalOffice || "-"}</div>
                                        <div><strong>Oficina:</strong> {item.office || "-"}</div>
                                        <div><strong>Unidad:</strong> {item.unit || "-"}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 w-60">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-sm border-blue-200 border">
                                        {item.patrimonial_code || "-"}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{item.type || "-"}</td>
                                <td className="px-4 py-2 text-red-500">{item.ip_address || "-"}</td>
                                <td className="px-4 py-2">{item.status || "-"}</td>
                                <td className="px-4 py-2">
                                    <Button size="sm" variant="outline" className="p-0">
                                        <NavLink className="p-2" to={`/oti/search-printer-scanner/${item.patrimonial_code}`}>
                                            <Eye />
                                        </NavLink>
                                    </Button>
                                </td>
                            </tr>
                        ))}

                        {printers.length === 0 && !loading && (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {loading && <div className="text-center py-4 text-gray-500">Cargando...</div>}

                {hasMore && <div ref={observerRef} className="h-4" />}
            </div>
        </div>
    )
}

export default PrinterScannerList
