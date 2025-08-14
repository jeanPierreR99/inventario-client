import type { IOtiPrinterScanner } from './IOtiPrinterScanner';
import type { IOtiRouter } from './IOtiRouter';
import type { IOtiSwitch } from './IOtiSwitch';
import type { IOtiOther } from './IOtiOther';
import type { ISiga } from './Isiga';
import type { IOtiMonitor } from './IOtiMonitor';
import type { OtiUps } from './IOtiUps';

export interface IOtiComputer {
    id?: string;
    sede?: string;
    generalOffice?: string;
    office?: string;
    unit?: string;
    patrimonial_code?: string;
    denomination?: string;
    serial_number?: string;
    brand?: string;
    model?: string;
    color?: string;
    mac?: string;
    ip?: string;
    ip_server_remote?: string;
    type_service?: string;
    os?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    video_card?: string;
    antivirus?: string;
    remote_user?: string;
    hostname?: string;
    additional?: string;
    responsible?: string;
    cargo?: string;
    status?: string;
    user?: string;
    create_at?: string;
    printers?: IOtiPrinterScanner[];
    routers?: IOtiRouter[];
    switchs?: IOtiSwitch[];
    others?: IOtiOther[];
    monitors?: IOtiMonitor[];
    computers?: IOtiComputer[];
    ups?: OtiUps[]
    printer_codes?: string[];
    router_codes?: string[];
    monitor_codes?: string[];
    switch_codes?: string[];
    other_codes?: string[];
    ups_codes?: string[];
    siga?: ISiga; // nueva relación
    type_contract: string;
}
