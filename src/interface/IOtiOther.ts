import type { IOtiComputer } from "./IOtiComputer";
import type { ISiga } from "./Isiga";

export interface IOtiOther {
    id?: string;

    // Nombre o denominación del equipo
    denomination?: string;

    sede?: string;
    generalOffice?: string;
    office?: string;
    unit?: string;

    // Código patrimonial único
    patrimonial_code?: string;

    // Tipo de equipo (servidor, teclado, monitor, etc.)
    type?: string;

    // Número de serie
    serial_number?: string;

    // Marca del equipo
    brand?: string;

    // Modelo del equipo
    model?: string;

    // Descripción adicional
    description?: string;

    // Tipo de conexión (USB, HDMI, etc.)
    connection_type?: string;

    // Tamaño en pulgadas (para monitores)
    size_inches?: null;

    // Procesador (si aplica)
    processor?: string;

    // Memoria RAM (si aplica)
    memory?: string;

    // Almacenamiento (SSD, HDD, etc.)
    storage?: string;

    // Fuente de poder (UPS, etc.)
    power_supply?: string;

    // Descripción de los puertos (ej. 2x HDMI, 4x USB)
    ports?: string;

    // Uso principal del equipo (ej. “CCTV”, “Servidor web”)
    usage?: string;

    // Usuario asignado al equipo
    assigned_user?: string;

    // Detalles de ubicación interna (ej. “Rack 2U”, “Escritorio B3”)
    location_details?: string;

    // Estado del equipo
    status?: string;

    // Fecha de creación o registro
    create_at?: string;

    // Relación con una computadora (opcional)
    computer?: IOtiComputer;
    type_contract: string;

    // Relación con SIGA (opcional)
    siga?: ISiga;
}
