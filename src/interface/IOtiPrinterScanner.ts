import type { IOtiComputer } from "./IOtiComputer";
import type { ISiga } from "./Isiga";

export interface IOtiPrinterScanner {
  // Identificación general
  id?: string;
  denomination?: string;
  type?: string;
  patrimonial_code?: string;
  serial_number?: string;
  brand?: string;
  model?: string;
  color?: string;

  // Ubicación
  sede?: string;
  generalOffice?: string;
  office?: string;
  unit?: string;

  // Red
  mac_address?: string;
  ip_address?: string;
  type_service?: string;
  connection_type?: string;

  // Especificaciones técnicas
  print_resolution?: string;
  scan_resolution?: string;
  print_speed_ppm?: string;
  paper_format?: string;
  tray_capacity?: string;
  cartridge_type?: string;
  compatible_cartridges?: string;
  duplex?: boolean;
  functions?: string;

  // Estado y mantenimiento
  status?: string;
  provider?: string;
  purchase_date?: string;
  warranty?: boolean;
  warranty_end?: string;
  last_maintenance?: string;
  next_maintenance?: string;
  observations?: string;

  // Auditoría
  create_at?: string;
  type_contract: string;

  // Relaciones
  computer?: IOtiComputer;
  siga?: ISiga;
}
