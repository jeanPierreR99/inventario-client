import { API } from '@/lib/api';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import ModalSystem from '../components/ModalSystem';
import { useParams } from 'react-router-dom';
import { PageTitle } from '@/shared/components/PageTitle';
import type { OtiUps } from '@/interface/IOtiUps';

const UpsSearch = () => {
    const [upsList, setUpsList] = useState<OtiUps[]>([]);
    const [search, setSearch] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { code } = useParams();

    const term = search.trim() ? search : code?.trim();

    const fetchUps = async () => {
        try {
            if (!term) return;
            setUpsList([]);
            const response = await API.getByCodeOtiUps(term);
            setUpsList(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUps();
    }, []);

    if (!upsList || upsList.length === 0) {
        return (
            <div>
                <PageTitle title="Buscar UPS" />
                <div className="flex gap-2">
                    <Input
                        className='bg-white'
                        placeholder="Buscar por código patrimonial..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={fetchUps}>Buscar</Button>
                </div>
                <p className="mt-4 text-gray-500">No hay resultados.</p>
            </div>
        );
    }

    const ups = upsList[0];

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
            id: 'ups',
            data: {
                label: buildNodeLabel(
                    '🔋',
                    `${ups.denomination || 'UPS'} (${ups.model || ''})`,
                    'ups',
                    ups,
                    `Serie: ${ups.serial_number || 'N/A'}`,
                    `Voltage: ${ups.voltage || 'N/A'}`
                )
            },
            position: { x: 400, y: 0 },
            style: { background: '#f59e0b', padding: 10, borderRadius: 8, width: 300 }
        },
        ...(ups.computer
            ? [
                {
                    id: 'computer',
                    data: {
                        label: buildNodeLabel(
                            '💻',
                            `${ups.computer.denomination || 'PC'} (${ups.computer.model || ''})`,
                            'pc',
                            ups.computer,
                            `IP: ${ups.computer.ip || 'N/A'}`,
                            `Serie: ${ups.computer.serial_number || 'N/A'}`,
                            `Usuario: ${ups.computer.user || 'N/A'}`
                        )
                    },
                    position: { x: 400, y: 200 },
                    style: { background: '#3b82f6', padding: 8, borderRadius: 6, width: 300 }
                }
            ]
            : [])
    ];

    const edges = ups.computer
        ? [{ id: 'e-ups-pc', source: 'ups', target: 'computer' }]
        : [];

    return (
        <div className="w-full h-[80vh]">
            <PageTitle title="Lista de UPS" />
            <div className="flex gap-2">
                <Input
                                        className='bg-white'

                    placeholder="Buscar por código patrimonial..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={fetchUps}>Buscar</Button>
            </div>

            <div className="flex flex-wrap gap-4 items-center text-sm mt-4">
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#f59e0b' }}></span> UPS
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#3b82f6' }}></span> Computadora
                </div>
            </div>

            <div className="w-full h-[90%] mt-4 bg-white">
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

export default UpsSearch;
