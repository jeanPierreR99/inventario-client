import type { IOtiComputer } from "./IOtiComputer";
import type { ISiga } from "./Isiga";

export interface IOtiMonitor {
    id?: string;

    denomination?: string;
    patrimonial_code?: string;
    serial_number?: string;
    sede?: string;
    generalOffice?: string;
    office?: string;
    unit?: string;
    brand?: string;
    model?: string;
    size_inches?: null;
    resolution?: string;
    connection_type?: string;
    ports?: string;
    assigned_user?: string;
    location_details?: string;
    status?: string;
    hostname?: string;
    create_at?: string; // o Date si lo usas como objeto Date

    // Campos adicionales
    panel_type?: string;
    refresh_rate?: string;
    aspect_ratio?: string;
    has_speakers?: boolean;
    mount_type?: string;
    energy_rating?: string;
    programs?: string;
    additional?: string;
    // Relaciones
    computers?: IOtiComputer[]
    type_contract: string;
    siga?: ISiga
}
