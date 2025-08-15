import type { IOtiSwitch } from '@/interface/IOtiSwitch';
import { API } from '@/lib/api';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import ModalSystem from '../components/ModalSystem';
import { useParams } from 'react-router-dom';
import { PageTitle } from '@/shared/components/PageTitle';

const SwitchSearch = () => {
    const [switches, setSwitches] = useState<IOtiSwitch[]>([]);
    const [search, setSearch] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { code } = useParams();

    const term = search.trim() ? search : code?.trim();

    const fetchSwitch = async () => {
        try {
            if (!term) return;
            setSwitches([]);
            const response = await API.getByCodeOtiSwitch(term);
            setSwitches(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSwitch();
    }, []);

    if (!switches || switches.length === 0) {
        return (
            <div>
                <PageTitle title="Buscar switches" />
                <div className="flex gap-2">
                    <Input
                        placeholder="Buscar por código patrimonial..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={fetchSwitch}>Buscar</Button>
                </div>
                <p className="mt-4 text-gray-500">No hay resultados.</p>
            </div>
        );
    }

    const sw = switches[0];

    const buildNodeLabel = (
        icon: string,
        title: string,
        type: string,
        item: any,
        ...fields: string[]
    ) => (
        <button
            className="flex flex-col text-white text-lg"
            onClick={() => {
                setSelectedType(type);
                setSelectedItem(item);
                setOpenModal(true);
            }}
        >
            <div className="font-bold">
                {icon} {title}
            </div>
            {fields.map((f, idx) => (
                <div key={idx}>{f}</div>
            ))}
        </button>
    );

    const nodes = [
        {
            id: 'switch',
            data: {
                label: buildNodeLabel(
                    '🔀',
                    `${sw.denomination || 'Switch'} (${sw.model || ''})`,
                    'switch',
                    sw,
                    `Serie: ${sw.serial_number || 'N/A'}`,
                    `Puertos: ${sw.ports || 'N/A'}`,
                )
            },
            position: { x: 400, y: 0 },
            style: { background: '#8b5cf6', padding: 10, borderRadius: 8, width: 300 }
        },
        ...sw.computers?.map((c, i) => ({
            id: `computer-${i}`,
            data: {
                label: buildNodeLabel(
                    '💻',
                    `${c.denomination || 'PC'} (${c.model || ''})`,
                    'pc',
                    c,
                    `IP: ${c.ip || 'N/A'}`,
                    `Serie: ${c.serial_number || 'N/A'}`,
                    `Usuario: ${c.user || 'N/A'}`
                )
            },
            position: { x: 100 + i * 400, y: 300 },
            style: { background: '#3b82f6', padding: 8, borderRadius: 6, width: 300 }
        })) || [],
    ];

    const edges = [
        ...(sw.computers?.map((_, i) => ({ id: `e-pr-${i}`, source: 'switch', target: `computer-${i}` })) || []),
    ]

    return (
        <div className="w-full h-[80vh]">
            <PageTitle title="Lista de switches" />
            <div className="flex gap-2">
                <Input
                    placeholder="Buscar por código patrimonial..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={fetchSwitch}>Buscar</Button>
            </div>

            <div className="flex flex-wrap gap-4 items-center text-sm mt-4">
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#8b5cf6' }}></span> Switch
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#3b82f6' }}></span> Computadora
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

export default SwitchSearch;
