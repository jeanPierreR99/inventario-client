import type { IOtiComputer } from '@/interface/IOtiComputer';
import { API } from '@/lib/api';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button'; // ⬅️ Importar botón de ShadCN
import { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import ModalSystem from '../components/ModalSystem';
import { useParams } from 'react-router-dom';
import { PageTitle } from '@/shared/components/PageTitle';

const ComputerSearch = () => {
    const [computers, setComputers] = useState<IOtiComputer[]>([]);
    const [search, setSearch] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { code } = useParams();

    const term = search.trim() ? search : code?.trim();
    const fetchComputer = async () => {
        try {
            if (!term) return;
            setComputers([]);
            const response = await API.getByCodeOtiComputer(term);
            setComputers(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchComputer();
    }, []);

    if (!computers || computers.length === 0) {
        return (
            <div className="">
                <PageTitle title="Buscar computadoras" />

                <div className="flex gap-2">
                    <Input
                        placeholder="Buscar por código patrimonial..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={fetchComputer}>
                        Buscar
                    </Button>
                </div>
                <p className="mt-4 text-gray-500">No computers available.</p>
            </div>
        );
    }

    const pc = computers[0];

    const buildNodeLabel = (icon: string, title: string, type: string, item: any, ...fields: string[]) => (
        <button className="flex flex-col text-white text-lg" onClick={() => {
            setSelectedType(type);
            setSelectedItem(item);
            setOpenModal(true);
        }}>
            <div className="font-bold">{icon} {title}</div>
            {fields.map((f, idx) => (
                <div key={idx}>{f}</div>
            ))}
        </button>
    );

    const nodes = [
        {
            id: 'pc',
            data: {
                label: buildNodeLabel(
                    '💻',
                    `${pc.denomination || 'PC'} (${pc.model || ''})`,
                    "pc",
                    pc,
                    `IP: ${pc.ip || 'N/A'}`,
                    `Serie: ${pc.serial_number || 'N/A'}`,
                    `Usuario: ${pc.user || 'N/A'}`
                )
            },
            position: { x: 400, y: 0 },
            style: { background: '#3b82f6', padding: 10, borderRadius: 8, width: 300 }
        },
        ...pc.printers?.map((p, i) => ({
            id: `printer-${i}`,
            data: {
                label: buildNodeLabel(
                    '🖨',
                    `${p.denomination || ''} ${p.model || ''}`,
                    "printer",
                    p,
                    `Serie: ${p.serial_number || 'N/A'}`,
                    `IP: ${p.ip_address || 'N/A'}`
                )
            },
            position: { x: 0, y: 150 + i * 200 },
            style: { background: '#10b981', padding: 8, borderRadius: 6, width: 300 }
        })) || [],
        ...pc.monitors?.map((m, i) => ({
            id: `monitor-${i}`,
            data: {
                label: buildNodeLabel(
                    '🖥',
                    `${m.denomination || ''} ${m.model || ''}`,
                    "monitor",
                    m,
                    `Serie: ${m.serial_number || 'N/A'}`
                )
            },
            position: { x: 400, y: 350 + i * 100 },
            style: { background: '#f59e0b', padding: 8, borderRadius: 6, width: 300 }
        })) || [],
        ...pc.others?.map((o, i) => ({
            id: `other-${i}`,
            data: {
                label: buildNodeLabel(
                    '🔧',
                    `${o.denomination || ''} ${o.model || ''}`,
                    "others",
                    o,
                    `Serie: ${o.serial_number || 'N/A'}`
                )
            },
            position: { x: 800, y: 150 + i * 200 },
            style: { background: '#6b7280', padding: 8, borderRadius: 6, width: 300 }
        })) || [],
        ...pc.routers?.map((r, i) => ({
            id: `router-${i}`,
            data: {
                label: buildNodeLabel(
                    '📡',
                    `${r.denomination || ''} ${r.model || ''}`,
                    "router",
                    r,
                    `IP: ${r.ip || 'N/A'}`
                )
            },
            position: { x: 1200, y: 150 + i * 100 },
            style: { background: '#8b5cf6', padding: 8, borderRadius: 6, width: 300 }
        })) || [],
        ...pc.switchs?.map((s, i) => ({
            id: `switch-${i}`,
            data: {
                label: buildNodeLabel(
                    '🔌',
                    `${s.denomination || ''} ${s.model || ''}`,
                    "switch",
                    s,
                    `Puertos: ${s.ports || 'N/A'}`
                )
            },
            position: { x: 1000, y: 150 + i * 100 },
            style: { background: '#ef4444', padding: 8, borderRadius: 6, width: 300 }
        })) || [],
        ...pc.ups?.map((u, i) => ({
            id: `ups-${i}`,
            data: {
                label: buildNodeLabel(
                    '🔋',
                    `${u.denomination || ''} ${u.model || ''}`,
                    "ups",
                    u,
                    `Capacidad: ${u.power_capacity || 'N/A'}`
                )
            },
            position: { x: 1300, y: 150 + i * 100 },
            style: { background: '#14b8a6', padding: 8, borderRadius: 6, width: 300 }
        })) || [],
    ];

    const edges = [
        ...(pc.printers?.map((_, i) => ({ id: `e-pr-${i}`, source: 'pc', target: `printer-${i}` })) || []),
        ...(pc.monitors?.map((_, i) => ({ id: `e-mo-${i}`, source: 'pc', target: `monitor-${i}` })) || []),
        ...(pc.others?.map((_, i) => ({ id: `e-ot-${i}`, source: 'pc', target: `other-${i}` })) || []),
        ...(pc.routers?.map((_, i) => ({ id: `e-ro-${i}`, source: 'pc', target: `router-${i}` })) || []),
        ...(pc.switchs?.map((_, i) => ({ id: `e-sw-${i}`, source: 'pc', target: `switch-${i}` })) || []),
        ...(pc.ups?.map((_, i) => ({ id: `e-up-${i}`, source: 'pc', target: `ups-${i}` })) || []),
    ];

    return (
        <div className="w-full h-[80vh]">
            <PageTitle title="Lista de computadoras" />

            <div className="flex gap-2">

                <Input
                    placeholder="Buscar por código patrimonial..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={fetchComputer}>
                    Buscar
                </Button>
            </div>

            <div className="flex flex-wrap gap-4 items-center text-sm mt-4">
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#3b82f6' }}></span> Computadora
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#10b981' }}></span> Impresora
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#f59e0b' }}></span> Monitor
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#6b7280' }}></span> Otros
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#8b5cf6' }}></span> Router
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#ef4444' }}></span> Switch
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#14b8a6' }}></span> UPS
                </div>
            </div>

            <div className="w-full h-[90%] mt-4">
                <ReactFlow nodes={nodes} edges={edges} fitView>
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>

            <ModalSystem
                open={openModal}
                onClose={() => setOpenModal(false)}
                type={selectedType}
                data={selectedItem}
            />
        </div>
    );
};

export default ComputerSearch;
