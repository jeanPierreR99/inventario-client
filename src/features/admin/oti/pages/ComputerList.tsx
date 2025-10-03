import { useEffect, useRef, useState } from "react"
import type { IOtiComputer } from "@/interface/IOtiComputer"
import { API } from "@/lib/api"
import { Button } from "@/shared/components/ui/button"
import { ArrowBigUpDash, Eye, Search } from "lucide-react"
import { PageTitle } from "@/shared/components/PageTitle"
import { NavLink } from "react-router-dom"
import { sedeData } from "@/data/sede_data"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"

const LIMIT = 10

const ComputerList = () => {
    const [computers, setComputers] = useState<IOtiComputer[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)

    const observerRef = useRef<HTMLDivElement | null>(null)

    // Filtros
    const [selectedSede, setSelectedSede] = useState<string>("")
    const [selectedGeneralOffice, setSelectedGeneralOffice] = useState<string>("")
    const [selectedOffice, setSelectedOffice] = useState<string>("")
    const [selectedUnit, setSelectedUnit] = useState<string>("")

    const [generalOffices, setGeneralOffices] = useState<any[]>([])
    const [offices, setOffices] = useState<any[]>([])
    const [units, setUnits] = useState<string[]>([])

    // 🔍 Buscador por IP o MAC
    const [searchTerm, setSearchTerm] = useState("")

    // Construir query
    const buildQuery = () => {
        if (selectedUnit) return selectedUnit
        if (selectedOffice) return selectedOffice
        if (selectedGeneralOffice) return selectedGeneralOffice
        if (selectedSede) return selectedSede
        return null
    }

    const fetchComputers = async (currentPage: number) => {
        if (loading) return
        setLoading(true)

        try {
            const query = buildQuery()

            if (query) {
                const data = await API.getAllDataFilterOtiComputer(query)
                setComputers(data)
                setHasMore(false)
            } else {
                const data = await API.getAllDataOtiComputer(currentPage, LIMIT)
                setComputers(prev => (currentPage === 1 ? data : [...prev, ...data]))
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
        setComputers([])
    }, [selectedSede, selectedGeneralOffice, selectedOffice, selectedUnit])

    useEffect(() => {
        if (!hasMore || loading) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) setPage(prev => prev + 1)
            },
            { rootMargin: "200px" }
        )

        if (observerRef.current) observer.observe(observerRef.current)
        return () => observer.disconnect()
    }, [hasMore, loading])

    useEffect(() => {
        fetchComputers(page)
    }, [page])

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

    // 🔎 Filtrar resultados por ip o mac
    const filteredComputers = computers.filter(pc =>
        [pc.ip, pc.mac, pc.model, pc.user, pc.patrimonial_code].some(field =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

    return (
        <div>
            <PageTitle title="Lista de computadoras" />

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

            {/* 🔍 Input buscador */}
            <div className="relative w-full md:w-sm mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por IP, MAC, Modelo, Código o Usuario"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 pr-3 py-1.5 border rounded w-full bg-white"
                />
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
                    setComputers([])
                    setSearchTerm("")
                }}
            >
                <ArrowBigUpDash /> Refrescar
            </Button>

            <div className="overflow-x-auto bg-white">
                <table className="min-w-full text-xs">
                    <thead className="bg-gray-100 text-sm">
                        <tr>
                            <th className="px-4 py-2 text-center font-bold">#</th>
                            <th className="px-4 py-2 text-left">Fecha de registro</th>
                            <th className="px-4 py-2 text-left">Ubicación</th>
                            <th className="px-4 py-2 text-left">IP</th>
                            <th className="px-4 py-2 text-left">MAC</th>
                            <th className="px-4 py-2 text-left">Modelo</th>
                            <th className="px-4 py-2 text-left">Usuario</th>
                            <th className="px-4 py-2 text-left">Código</th>
                            <th className="px-4 py-2 text-left">Estado</th>
                            <th className="px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComputers.map((pc, index) => (
                            <tr key={pc.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2 font-bold text-center">{index + 1}</td>
                                <td className="px-4 py-2">{pc.create_at ? new Date(pc.create_at).toLocaleDateString() : "-"}</td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-col gap-1">
                                        <div><strong>Sede:</strong> {pc.sede || "-"}</div>
                                        <div><strong>Oficina general:</strong> {pc.generalOffice || "-"}</div>
                                        <div><strong>Oficina:</strong> {pc.office || "-"}</div>
                                        <div><strong>Unidad:</strong> {pc.unit || "-"}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 w-60">
                                    <span className="bg-red-100 text-red-500 px-2 py-1 rounded-sm border-red-200 border">
                                        {pc.ip || "-"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 w-60">
                                    <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-sm border-gray-200 border">
                                        {pc.mac || "-"}
                                    </span>
                                </td>                                <td className="px-4 py-2 w-60">
                                    <span className="bg-green-100 text-green-500 px-2 py-1 rounded-sm border-green-200 border">
                                        {pc.model || "-"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 w-60">
                                    <span className="bg-cyan-100 text-cyan-500 px-2 py-1 rounded-sm border-cyan-200 border">
                                        {pc.user || "-"}
                                    </span>
                                </td>                                <td className="px-4 py-2 w-60">
                                    <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-sm border-blue-200 border">
                                        {pc.patrimonial_code || "-"}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{pc.status || "-"}</td>
                                <td className="px-4 py-2">
                                    <Button size="sm" variant="outline" className="p-0">
                                        <NavLink target="_blank" className="p-2" to={`/oti/search-computer/${pc.patrimonial_code}`}>
                                            <Eye />
                                        </NavLink>
                                    </Button>
                                </td>
                            </tr>
                        ))}

                        {filteredComputers.length === 0 && !loading && (
                            <tr>
                                <td colSpan={9} className="text-center py-4 text-gray-500">
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

export default ComputerList
