import type { IOtiComputer } from "./IOtiComputer";
import type { ISiga } from "./Isiga";

export interface IOtiSwitch {
    id?: string;

    // Ubicación
    sede?: string;
    generalOffice?: string;
    office?: string;
    unit?: string;
    location_description?: string; // Ej: "Gabinete Rack A, Piso 2"

    // Identificación
    patrimonial_code?: string;
    denomination?: string;
    serial_number?: string;
    brand?: string;
    model?: string;
    color?: string;

    // Características técnicas
    ports?: string;               // Ej: "24", "48", "24+4 SFP"
    speed?: string;               // Ej: "10/100/1000 Mbps"
    uplink_ports?: string;        // Ej: "2 SFP+"
    power_over_ethernet?: string; // Ej: "PoE", "PoE+", "No"
    is_managed?: boolean;         // ¿Es administrable?
    vlan_support?: boolean;       // ¿Soporta VLANs?
    stackable?: boolean;          // ¿Es apilable?
    firmware_version?: string;    // Firmware actual
    admin_user?: string;
    admin_password?: string;
    additional?: string;

    // Estado
    status?: string;
    create_at?: string;
    type_contract: string;

    // Relaciones
    computers?: IOtiComputer[]
    siga?: ISiga;
}
