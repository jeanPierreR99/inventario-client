import type { IOtiPrinterScanner } from '@/interface/IOtiPrinterScanner';
import { API } from '@/lib/api';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import ModalSystem from '../components/ModalSystem';
import { useParams } from 'react-router-dom';
import { PageTitle } from '@/shared/components/PageTitle';

const PrinterScannerSearch = () => {
    const [printers, setPrinters] = useState<IOtiPrinterScanner[]>([]);
    const [search, setSearch] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { code } = useParams();

    const term = search.trim() ? search : code?.trim();

    const fetchPrinter = async () => {
        try {
            if (!term) return;
            setPrinters([]);
            const response = await API.getByCodeOtiPrinterScanner(term);
            setPrinters(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPrinter();
    }, []);

    if (!printers || printers.length === 0) {
        return (
            <div>
                <PageTitle title="Buscar impresoras / escáneres" />
                <div className="flex gap-2">
                    <Input
                        placeholder="Buscar por código patrimonial..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={fetchPrinter}>Buscar</Button>
                </div>
                <p className="mt-4 text-gray-500">No hay resultados.</p>
            </div>
        );
    }

    const printer = printers[0];

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
            id: 'printer',
            data: {
                label: buildNodeLabel(
                    '🖨',
                    `${printer.denomination || 'Impresora'} (${printer.model || ''})`,
                    'printer',
                    printer,
                    `Serie: ${printer.serial_number || 'N/A'}`,
                    `IP: ${printer.ip_address || 'N/A'}`
                )
            },
            position: { x: 400, y: 0 },
            style: { background: '#10b981', padding: 10, borderRadius: 8, width: 300 }
        },
        ...(printer.computer
            ? [
                {
                    id: 'computer',
                    data: {
                        label: buildNodeLabel(
                            '💻',
                            `${printer.computer.denomination || 'PC'} (${printer.computer.model || ''})`,
                            'pc',
                            printer.computer,
                            `IP: ${printer.computer.ip || 'N/A'}`,
                            `Serie: ${printer.computer.serial_number || 'N/A'}`,
                            `Usuario: ${printer.computer.user || 'N/A'}`
                        )
                    },
                    position: { x: 400, y: 400 },
                    style: { background: '#3b82f6', padding: 8, borderRadius: 6, width: 300 }
                }
            ]
            : [])
    ];

    const edges = printer.computer
        ? [{ id: 'e-pr-pc', source: 'printer', target: 'computer' }]
        : [];

    return (
        <div className="w-full h-[80vh]">
            <PageTitle title="Lista de impresoras / escáneres" />
            <div className="flex gap-2">
                <Input
                    placeholder="Buscar por código patrimonial..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={fetchPrinter}>Buscar</Button>
            </div>

            <div className="flex flex-wrap gap-4 items-center text-sm mt-4">
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded" style={{ background: '#10b981' }}></span> Impresora / Escáner
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

export default PrinterScannerSearch;
