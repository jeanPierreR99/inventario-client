import type { IOtiComputer } from "./IOtiComputer";
import type { ISiga } from "./Isiga";

export interface OtiUps {
    id?: string;

    // --- Ubicación ---
    sede?: string;
    generalOffice?: string;
    office?: string;
    unit?: string;

    // --- Identificación ---
    patrimonial_code?: string;
    denomination?: string;
    serial_number?: string;
    brand?: string;
    model?: string;
    color?: string;

    // --- Características técnicas ---
    power_capacity?: string;
    battery_runtime?: string;
    voltage?: string;
    input_output_type?: string;
    communication_ports?: string;
    is_online?: boolean;
    firmware_version?: string;
    admin_user?: string;
    admin_password?: string;
    additional?: string;

    // --- Estado general ---
    status?: string;
    create_at?: string;
    type_contract: string;

    // --- Relaciones ---
    computers?: IOtiComputer[]
    siga?: ISiga;
}
