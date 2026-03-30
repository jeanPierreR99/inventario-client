import type { IDevice } from "./IDevice";

export interface IRouter {
    id?: string;
    name: string;
    ip: string;
    piso: string;
    segment: string;
    devices?: IDevice[];
}