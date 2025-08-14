import React from 'react';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/shared/components/ui/sheet';
import ModalContent from './ModalContent';

interface ModalSystemProps {
    open: boolean;
    onClose: () => void;
    type: string;
    data: any;
}

const ModalSystem: React.FC<ModalSystemProps> = ({ open, onClose, type, data }) => {
    if (!data) return null;

    const dataSiga: { label: string; value: any }[] = [
        { label: 'Código Patrimonial', value: data.siga?.codigo_patrimonial ?? '' },
        { label: 'Descripción', value: data.siga?.descripcion ?? '' },
        { label: 'Fecha de Compra', value: data.siga?.fecha_compra ?? '' },
        { label: 'Fecha de Alta', value: data.siga?.fecha_alta ?? '' },
        { label: 'Nombre', value: data.siga?.nombre ?? '' },
        { label: 'Modelo', value: data.siga?.modelo ?? '' },
        { label: 'N° de Orden', value: data.siga?.nro_orden ?? '' },
        { label: 'Código de Barra', value: data.siga?.codigo_barra ?? '' },
        { label: 'Mayor', value: data.siga?.mayor ?? '' },
        { label: 'Grupo de Bien', value: data.siga?.grupo_bien ?? '' },
        { label: 'Clase de Bien', value: data.siga?.clase_bien ?? '' },
        { label: 'Familia de Bien', value: data.siga?.familia_bien ?? '' },
        { label: 'Centro de Costo', value: data.siga?.centro_costo ?? '' },
        { label: 'Nombre Dependencia', value: data.siga?.nombre_depend ?? '' },
        { label: 'N° Pecosa', value: data.siga?.nro_pecosa ?? '' },
        { label: 'Nombre Familia', value: data.siga?.nombre_fam ?? '' },
        { label: 'Depreciación Inicial', value: data.siga?.depr_inicial ?? '' },
        { label: 'Sec. Modelo', value: data.siga?.sec_modelo ?? '' },
        { label: 'H. Depreciación Ajustada', value: data.siga?.hdepr_ajustada ?? '' },
        { label: 'H. Depreciación Ejercicio', value: data.siga?.hdepr_ejercicio ?? '' },
        { label: 'N° de Serie', value: data.siga?.nro_serie ?? '' },
        { label: 'Fecha de Creación', value: data.siga?.create_at ? new Date(data.siga.create_at).toLocaleString() : '' }
    ];

    const renderContent = () => {
        switch (type) {
            case 'ups':
                const fieldsUps: { label: string; value: any }[] = [
                    { label: 'Sede', value: data.sede },
                    { label: 'Oficina General', value: data.generalOffice },
                    { label: 'Oficina', value: data.office },
                    { label: 'Unidad', value: data.unit },
                    { label: 'Código Patrimonial', value: data.patrimonial_code },
                    { label: 'Denominación', value: data.denomination },
                    { label: 'Número de Serie', value: data.serial_number },
                    { label: 'Marca', value: data.brand },
                    { label: 'Modelo', value: data.model },
                    { label: 'Color', value: data.color },
                    { label: 'MAC', value: data.mac },
                    { label: 'IP', value: data.ip },
                    { label: 'IP Servidor Remoto', value: data.ip_server_remote },
                    { label: 'Tipo de Servicio', value: data.type_service },
                    { label: 'Sistema Operativo', value: data.os },
                    { label: 'Procesador', value: data.processor },
                    { label: 'RAM', value: data.ram },
                    { label: 'Almacenamiento', value: data.storage },
                    { label: 'Tarjeta de Video', value: data.video_card },
                    { label: 'Antivirus', value: data.antivirus },
                    { label: 'Usuario Remoto', value: data.remote_user },
                    { label: 'Hostname', value: data.hostname },
                    { label: 'Información Adicional', value: data.additional },
                    { label: 'Responsable', value: data.responsible },
                    { label: 'Cargo', value: data.cargo },
                    { label: 'Estado', value: data.status },
                    { label: 'Usuario', value: data.user },
                    { label: 'Fecha de Creación', value: data.create_at ? new Date(data.create_at).toLocaleString() : '' },
                    { label: 'Tipo de Contrato', value: data.type_contract },
                ];
                return <ModalContent fields={fieldsUps} dataSiga={dataSiga} />;
            case 'printer':
                const fieldsPrinter: { label: string; value: any }[] = [
                    { label: 'Denominación', value: data.denomination },
                    { label: 'Tipo', value: data.type },
                    { label: 'Código Patrimonial', value: data.patrimonial_code },
                    { label: 'Número de Serie', value: data.serial_number },
                    { label: 'Marca', value: data.brand },
                    { label: 'Modelo', value: data.model },
                    { label: 'Color', value: data.color },
                    { label: 'Sede', value: data.sede },
                    { label: 'Oficina General', value: data.generalOffice },
                    { label: 'Oficina', value: data.office },
                    { label: 'Unidad', value: data.unit },
                    { label: 'MAC', value: data.mac_address },
                    { label: 'IP', value: data.ip_address },
                    { label: 'Tipo de Servicio', value: data.type_service },
                    { label: 'Conexión', value: data.connection_type },
                    { label: 'Resolución de Impresión', value: data.print_resolution },
                    { label: 'Resolución de Escaneo', value: data.scan_resolution },
                    { label: 'Velocidad de Impresión (PPM)', value: data.print_speed_ppm },
                    { label: 'Formato de Papel', value: data.paper_format },
                    { label: 'Capacidad de Bandeja', value: data.tray_capacity },
                    { label: 'Tipo de Cartucho', value: data.cartridge_type },
                    { label: 'Cartuchos Compatibles', value: data.compatible_cartridges },
                    { label: 'Dúplex', value: data.duplex ? 'Sí' : data.duplex === false ? 'No' : '' },
                    { label: 'Funciones', value: data.functions },
                    { label: 'Estado', value: data.status },
                    { label: 'Proveedor', value: data.provider },
                    { label: 'Fecha de Compra', value: data.purchase_date },
                    { label: 'Garantía', value: data.warranty ? 'Sí' : data.warranty === false ? 'No' : '' },
                    { label: 'Fin de Garantía', value: data.warranty_end },
                    { label: 'Último Mantenimiento', value: data.last_maintenance },
                    { label: 'Próximo Mantenimiento', value: data.next_maintenance },
                    { label: 'Observaciones', value: data.observations },
                    { label: 'Fecha de Creación', value: data.create_at ? new Date(data.create_at).toLocaleString() : '' },
                    { label: 'Tipo de Contrato', value: data.type_contract }
                ];

                return <ModalContent fields={fieldsPrinter} dataSiga={dataSiga} />;
            case 'monitor':
                const fieldsMonitor: { label: string; value: any }[] = [
                    { label: 'Denominación', value: data.denomination },
                    { label: 'Código Patrimonial', value: data.patrimonial_code },
                    { label: 'Número de Serie', value: data.serial_number },
                    { label: 'Sede', value: data.sede },
                    { label: 'Oficina General', value: data.generalOffice },
                    { label: 'Oficina', value: data.office },
                    { label: 'Unidad', value: data.unit },
                    { label: 'Marca', value: data.brand },
                    { label: 'Modelo', value: data.model },
                    { label: 'Tamaño (pulgadas)', value: data.size_inches },
                    { label: 'Resolución', value: data.resolution },
                    { label: 'Tipo de Conexión', value: data.connection_type },
                    { label: 'Puertos', value: data.ports },
                    { label: 'Usuario Asignado', value: data.assigned_user },
                    { label: 'Detalles de Ubicación', value: data.location_details },
                    { label: 'Estado', value: data.status },
                    { label: 'Hostname', value: data.hostname },
                    { label: 'Tipo de Panel', value: data.panel_type },
                    { label: 'Frecuencia de Refresco', value: data.refresh_rate },
                    { label: 'Relación de Aspecto', value: data.aspect_ratio },
                    { label: 'Tiene Parlantes', value: data.has_speakers ? 'Sí' : data.has_speakers === false ? 'No' : '' },
                    { label: 'Tipo de Montura', value: data.mount_type },
                    { label: 'Eficiencia Energética', value: data.energy_rating },
                    { label: 'Programas Instalados', value: data.programs },
                    { label: 'Información Adicional', value: data.additional },
                    { label: 'Fecha de Creación', value: data.create_at ? new Date(data.create_at).toLocaleString() : '' },
                    { label: 'Tipo de Contrato', value: data.type_contract },
                ];

                return <ModalContent fields={fieldsMonitor} dataSiga={dataSiga} />;
            case 'router':
                const fieldsRouter: { label: string; value: any }[] = [
                    { label: 'Sede', value: data.sede },
                    { label: 'Oficina General', value: data.generalOffice },
                    { label: 'Oficina', value: data.office },
                    { label: 'Unidad', value: data.unit },
                    { label: 'Código Patrimonial', value: data.patrimonial_code },
                    { label: 'Denominación', value: data.denomination },
                    { label: 'Número de Serie', value: data.serial_number },
                    { label: 'Marca', value: data.brand },
                    { label: 'Modelo', value: data.model },
                    { label: 'Color', value: data.color },
                    { label: 'MAC', value: data.mac },
                    { label: 'IP', value: data.ip },
                    { label: 'Tipo de Servicio', value: data.type_service },
                    { label: 'Tipo de Conexión', value: data.connection_type },
                    { label: 'Banda de Frecuencia', value: data.frequency_band },
                    { label: 'Puertos', value: data.ports },
                    { label: 'Versión de Firmware', value: data.firmware_version },
                    { label: 'Rendimiento (Mbps)', value: data.throughput },
                    { label: 'Antenas', value: data.antennas },
                    { label: 'Soporta Mesh', value: data.is_mesh_capable ? 'Sí' : data.is_mesh_capable === false ? 'No' : '' },
                    { label: 'Usuario Admin', value: data.admin_user },
                    { label: 'Contraseña Admin', value: data.admin_password },
                    { label: 'Wireless', value: data.wireless ? 'Sí' : data.wireless === false ? 'No' : '' },
                    { label: 'Contraseña WiFi', value: data.wireless_password },
                    { label: 'Información Adicional', value: data.additional },
                    { label: 'Descripción de Ubicación', value: data.location_description },
                    { label: 'Estado', value: data.status },
                    { label: 'Fecha de Creación', value: data.create_at ? new Date(data.create_at).toLocaleString() : '' },
                    { label: 'Tipo de Contrato', value: data.type_contract },
                ];

                return <ModalContent fields={fieldsRouter} dataSiga={dataSiga} />;
            case 'switch':
                const fieldsSwitch: { label: string; value: any }[] = [
                    { label: 'Sede', value: data.sede },
                    { label: 'Oficina General', value: data.generalOffice },
                    { label: 'Oficina', value: data.office },
                    { label: 'Unidad', value: data.unit },
                    { label: 'Descripción de Ubicación', value: data.location_description },
                    { label: 'Código Patrimonial', value: data.patrimonial_code },
                    { label: 'Denominación', value: data.denomination },
                    { label: 'Número de Serie', value: data.serial_number },
                    { label: 'Marca', value: data.brand },
                    { label: 'Modelo', value: data.model },
                    { label: 'Color', value: data.color },
                    { label: 'Cantidad de Puertos', value: data.ports },
                    { label: 'Velocidad', value: data.speed },
                    { label: 'Puertos Uplink', value: data.uplink_ports },
                    { label: 'PoE', value: data.power_over_ethernet },
                    { label: 'Administrable', value: data.is_managed ? 'Sí' : data.is_managed === false ? 'No' : '' },
                    { label: 'Soporte VLAN', value: data.vlan_support ? 'Sí' : data.vlan_support === false ? 'No' : '' },
                    { label: 'Apilable', value: data.stackable ? 'Sí' : data.stackable === false ? 'No' : '' },
                    { label: 'Versión de Firmware', value: data.firmware_version },
                    { label: 'Usuario Admin', value: data.admin_user },
                    { label: 'Contraseña Admin', value: data.admin_password },
                    { label: 'Información Adicional', value: data.additional },
                    { label: 'Estado', value: data.status },
                    { label: 'Fecha de Creación', value: data.create_at ? new Date(data.create_at).toLocaleString() : '' },
                    { label: 'Tipo de Contrato', value: data.type_contract },
                ];

                return <ModalContent fields={fieldsSwitch} dataSiga={dataSiga} />;
            case 'pc':
                const fieldsComputer: { label: string; value: any }[] = [
                    { label: 'Sede', value: data.sede },
                    { label: 'Oficina General', value: data.generalOffice },
                    { label: 'Oficina', value: data.office },
                    { label: 'Unidad', value: data.unit },
                    { label: 'Código Patrimonial', value: data.patrimonial_code },
                    { label: 'Denominación', value: data.denomination },
                    { label: 'Número de Serie', value: data.serial_number },
                    { label: 'Marca', value: data.brand },
                    { label: 'Modelo', value: data.model },
                    { label: 'Color', value: data.color },
                    { label: 'MAC', value: data.mac },
                    { label: 'IP', value: data.ip },
                    { label: 'IP Servidor Remoto', value: data.ip_server_remote },
                    { label: 'Tipo de Servicio', value: data.type_service },
                    { label: 'Sistema Operativo', value: data.os },
                    { label: 'Procesador', value: data.processor },
                    { label: 'Memoria RAM', value: data.ram },
                    { label: 'Almacenamiento', value: data.storage },
                    { label: 'Tarjeta de Video', value: data.video_card },
                    { label: 'Antivirus', value: data.antivirus },
                    { label: 'Usuario Remoto', value: data.remote_user },
                    { label: 'Hostname', value: data.hostname },
                    { label: 'Información Adicional', value: data.additional },
                    { label: 'Responsable', value: data.responsible },
                    { label: 'Cargo', value: data.cargo },
                    { label: 'Estado', value: data.status },
                    { label: 'Usuario', value: data.user },
                    { label: 'Fecha de Creación', value: data.create_at ? new Date(data.create_at).toLocaleString() : '' },
                    { label: 'Tipo de Contrato', value: data.type_contract },
                ];

                return <ModalContent fields={fieldsComputer} dataSiga={dataSiga} />;
            case 'others':
                const fieldsOther: { label: string; value: any }[] = [
                    { label: 'Denominación', value: data.denomination },
                    { label: 'Sede', value: data.sede },
                    { label: 'Oficina General', value: data.generalOffice },
                    { label: 'Oficina', value: data.office },
                    { label: 'Unidad', value: data.unit },
                    { label: 'Código Patrimonial', value: data.patrimonial_code },
                    { label: 'Tipo de Equipo', value: data.type },
                    { label: 'Número de Serie', value: data.serial_number },
                    { label: 'Marca', value: data.brand },
                    { label: 'Modelo', value: data.model },
                    { label: 'Descripción', value: data.description },
                    { label: 'Tipo de Conexión', value: data.connection_type },
                    { label: 'Tamaño (pulgadas)', value: data.size_inches },
                    { label: 'Procesador', value: data.processor },
                    { label: 'Memoria RAM', value: data.memory },
                    { label: 'Almacenamiento', value: data.storage },
                    { label: 'Fuente de Poder', value: data.power_supply },
                    { label: 'Puertos', value: data.ports },
                    { label: 'Uso', value: data.usage },
                    { label: 'Usuario Asignado', value: data.assigned_user },
                    { label: 'Detalles de Ubicación', value: data.location_details },
                    { label: 'Estado', value: data.status },
                    { label: 'Fecha de Creación', value: data.create_at ? new Date(data.create_at).toLocaleString() : '' },
                    { label: 'Tipo de Contrato', value: data.type_contract },
                ];

                return <ModalContent fields={fieldsOther} dataSiga={dataSiga} />;
            default:
                return <p>Sin vista definida para este tipo</p>;
        }
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader className='pr-8'>
                    <SheetTitle className='text-blue-600'>{type.toUpperCase()} - {data.denomination}</SheetTitle>
                    <SheetDescription className='text-gray-400'>Detalles del equipo seleccionado</SheetDescription>
                </SheetHeader>
                <div className="px-4 p-10 pt-0">
                    {renderContent()}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ModalSystem;
