import type { IOtiComputer } from "./IOtiComputer";
import type { ISiga } from "./Isiga";

export interface IOtiRouter {
  // Identificador único
  id?: string;

  // === Ubicación ===
  sede?: string;
  generalOffice?: string;
  office?: string;
  unit?: string;

  // === Identificación general ===
  patrimonial_code?: string;
  denomination?: string;
  serial_number?: string;
  brand?: string;
  model?: string;
  color?: string;

  // === Red ===
  mac?: string;
  ip?: string;
  type_service?: string;
  connection_type?: string;       // Ethernet, Mixto, WAN
  frequency_band?: string;        // 2.4GHz, 5GHz, Dual-Band
  ports?: string;                 // "4 LAN / 1 WAN"
  firmware_version?: string;
  throughput?: string;            // Mbps
  antennas?: string;              // "2 externas"
  is_mesh_capable?: boolean;

  // === Acceso ===
  admin_user?: string;
  admin_password?: string;
  wireless?: boolean;
  wireless_password?: string;
  additional?: string;

  // === Otros ===
  location_description?: string;
  status?: string;
  create_at?: string;
  type_contract: string;

  // === Relaciones ===
  computer?: IOtiComputer;
  siga?: ISiga;
}
