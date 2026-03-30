import type { IRouter } from "./IRouter";

export interface IDevice {
    id?: string;
    type: "pc" | "printer";
    name: string;
    ip: string;
    office: string;
    mac: string;
    routerId: string;
    router?: IRouter;
}
