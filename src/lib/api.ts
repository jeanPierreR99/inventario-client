import axios from "axios";
import type { ISiga } from "../interface/Isiga";
import type { IOtiComputer } from "../interface/IOtiComputer";
import type { IOtiOther } from "../interface/IOtiOther";
import type { IOtiRouter } from "../interface/IOtiRouter";
import type { IOtiPrinterScanner } from "../interface/IOtiPrinterScanner";
import type { IOtiSwitch } from "../interface/IOtiSwitch";
import type { IUser } from "../interface/IUser";
import type { ISinabip } from "../interface/ISinabip";
import type { IOtiMonitor } from "../interface/IOtiMonitor";
import type { OtiUps } from "../interface/IOtiUps";

export const API_BASE = "https://inventario.munitambopata.gob.pe/api/patrimonio"
// export const API_BASE = "http://localhost:3000/api/patrimonio"

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

export const API = {
    //SIGA
    getAllDataSiga: async (page: number, limit: number) => {
        const response: any = await api.get(`/siga/paginate?page=${page}&limit=${limit}`);
        return response.data.data
    },
    getByCodeSiga: async (code: string) => {
        const response: any = await api.get(`/siga/${code}`);
        return response.data.data
    },
    getQrSiga: async (code: string) => {
        const response: any = await api.get(`/siga/qr/${code}`);
        return response.data.data
    },
    saveSiga: async (data: ISiga) => {
        const response: any = await api.post(`/siga`, data);
        return response.data.data
    },
    deleteSiga: async (code: string) => {
        const response: any = await api.delete(`/siga/${code}`);
        return response.data.data
    },
    updateSiga: async (id: string, data: Partial<ISiga>) => {
        const response: any = await api.put(`/siga/${id}`, data);
        return response.data.data
    },
    //SINABIP
    getAllDataSinabip: async (page: number, limit: number) => {
        const response: any = await api.get(`/sinabip/paginate?page=${page}&limit=${limit}`);
        return response.data.data
    },
    getByCodeSinabip: async (code: string) => {
        const response: any = await api.get(`/sinabip/${code}`);
        return response.data.data
    },
    getQrSinabip: async (code: string) => {
        const response: any = await api.get(`/sinabip/qr/${code}`);
        return response.data.data
    },
    saveSinabip: async (data: ISiga) => {
        const response: any = await api.post(`/sinabip`, data);
        return response.data.data
    },
    deleteSinabip: async (code: string) => {
        const response: any = await api.delete(`/sinabip/${code}`);
        return response.data.data
    },
    updateSinabip: async (id: string, data: Partial<ISinabip>) => {
        const response: any = await api.put(`/sinabip/${id}`, data);
        return response.data.data
    },
    //OTI-COMPUTER
    getAllDataOtiComputer: async (page: number, limit: number) => {
        const response: any = await api.get(`/oti-computer/paginate?page=${page}&limit=${limit}`);
        return response.data.data
    },
    getAllDataFilterOtiComputer: async (query: string) => {
        const response: any = await api.get(`/oti-computer/filter?query=${query}`);
        return response.data.data
    },
    getByCodeOtiComputer: async (code: string) => {
        const response: any = await api.get(`/oti-computer/${code}`);
        return response.data.data
    },
    getQrOtiComputer: async (code: string) => {
        const response: any = await api.get(`/oti-computer/qr/${code}`);
        return response.data.data
    },
    saveOtiComputer: async (data: IOtiComputer) => {
        const response: any = await api.post(`/oti-computer`, data);
        return response.data.data
    },
    deleteOtiComputer: async (code: string) => {
        const response: any = await api.delete(`/oti-computer/${code}`);
        return response.data.data
    },
    updateOtiComputer: async (id: string, data: Partial<IOtiComputer>) => {
        const response: any = await api.put(`/oti-computer/${id}`, data);
        return response.data.data
    },

    //OTI-OTHERS
    getAllDataOtiOther: async (page: number, limit: number) => {
        const response: any = await api.get(`/oti-other/paginate?page=${page}&limit=${limit}`);
        return response.data.data
    },
    getAllDataFilterOtiOther: async (query: string) => {
        const response: any = await api.get(`/oti-other/filter?query=${query}`);
        return response.data.data
    },
    getByCodeOtiOther: async (code: string) => {
        const response: any = await api.get(`/oti-other/${code}`);
        return response.data.data
    },
    getQrOtiOther: async (code: string) => {
        const response: any = await api.get(`/oti-other/qr/${code}`);
        return response.data.data
    },
    saveOtiOther: async (data: IOtiOther) => {
        const response: any = await api.post(`/oti-other`, data);
        return response.data.data
    },
    deleteOtiOther: async (code: string) => {
        const response: any = await api.delete(`/oti-other/${code}`);
        return response.data.data
    },
    updateOtiOther: async (id: string, data: Partial<IOtiOther>) => {
        const response: any = await api.put(`/oti-other/${id}`, data);
        return response.data.data
    },

    //OTI-PRINTER-SCANNER
    getAllDataOtiPrinterScanner: async (page: number, limit: number) => {
        const response: any = await api.get(`/oti-printer-scanner/paginate?page=${page}&limit=${limit}`);
        return response.data.data
    },
    getAllDataFilterOtiPrinterScanner: async (query: string) => {
        const response: any = await api.get(`/oti-printer-scanner/filter?query=${query}`);
        return response.data.data
    },
    getByCodeOtiPrinterScanner: async (code: string) => {
        const response: any = await api.get(`/oti-printer-scanner/${code}`);
        return response.data.data
    },
    getQrOtiPrinterScanner: async (code: string) => {
        const response: any = await api.get(`/oti-printer-scanner/qr/${code}`);
        return response.data.data
    },
    saveOtiPrinterScanner: async (data: IOtiPrinterScanner) => {
        const response: any = await api.post(`/oti-printer-scanner`, data);
        return response.data.data
    },
    deleteOtiPrinterScanner: async (code: string) => {
        const response: any = await api.delete(`/oti-printer-scanner/${code}`);
        return response.data.data
    },
    updateOtiPrinterScanner: async (id: string, data: Partial<IOtiPrinterScanner>) => {
        const response: any = await api.put(`/oti-printer-scanner/${id}`, data);
        return response.data.data
    },

    //OTI-ROUTER
    getAllDataOtiRouter: async (page: number, limit: number) => {
        const response: any = await api.get(`/oti-router/paginate?page=${page}&limit=${limit}`);
        return response.data.data
    },
    getAllDataFilterOtiRouter: async (query: string) => {
        const response: any = await api.get(`/oti-router/filter?query=${query}`);
        return response.data.data
    },
    getByCodeOtiRouter: async (code: string) => {
        const response: any = await api.get(`/oti-router/${code}`);
        return response.data.data
    },
    getQrOtiRouter: async (code: string) => {
        const response: any = await api.get(`/oti-router/qr/${code}`);
        return response.data.data
    },
    saveOtiRouter: async (data: IOtiRouter) => {
        const response: any = await api.post(`/oti-router`, data);
        return response.data.data
    },
    deleteOtiRouter: async (code: string) => {
        const response: any = await api.delete(`/oti-router/${code}`);
        return response.data.data
    },
    updateOtiRouter: async (id: string, data: Partial<IOtiRouter>) => {
        const response: any = await api.put(`/oti-router/${id}`, data);
        return response.data.data
    },

    //OTI-SWITCH
    getAllDataOtiSwitch: async (page: number, limit: number) => {
        const response: any = await api.get(`/oti-switch/paginate?page=${page}&limit=${limit}`);
        return response.data.data
    },
    getAllDataFilterOtiSwitch: async (query: string) => {
        const response: any = await api.get(`/oti-switch/filter?query=${query}`);
        return response.data.data
    },
    getByCodeOtiSwitch: async (code: string) => {
        const response: any = await api.get(`/oti-switch/${code}`);
        return response.data.data
    },
    getQrOtiSwitch: async (code: string) => {
        const response: any = await api.get(`/oti-switch/qr/${code}`);
        return response.data.data
    },
    saveOtiSwitch: async (data: IOtiSwitch) => {
        const response: any = await api.post(`/oti-switch`, data);
        return response.data.data
    },
    deleteOtiSwitch: async (code: string) => {
        const response: any = await api.delete(`/oti-switch/${code}`);
        return response.data.data
    },
    updateOtiSwitch: async (id: string, data: Partial<IOtiSwitch>) => {
        const response: any = await api.put(`/oti-switch/${id}`, data);
        return response.data.data
    },

    // OTI-UPS
    getAllDataOtiUps: async (page: number, limit: number) => {
        const response: any = await api.get(`/oti-ups/paginate?page=${page}&limit=${limit}`);
        return response.data.data;
    },
    getAllDataFilterOtiUps: async (query: string) => {
        const response: any = await api.get(`/oti-ups/filter?query=${query}`);
        return response.data.data;
    },
    getByCodeOtiUps: async (code: string) => {
        const response: any = await api.get(`/oti-ups/${code}`);
        return response.data.data;
    },
    getQrOtiUps: async (code: string) => {
        const response: any = await api.get(`/oti-ups/qr/${code}`);
        return response.data.data;
    },
    saveOtiUps: async (data: OtiUps) => {
        const response: any = await api.post(`/oti-ups`, data);
        return response.data.data;
    },
    deleteOtiUps: async (code: string) => {
        const response: any = await api.delete(`/oti-ups/${code}`);
        return response.data.data;
    },
    updateOtiUps: async (id: string, data: Partial<OtiUps>) => {
        const response: any = await api.put(`/oti-ups/${id}`, data);
        return response.data.data;
    },


    // OTI-MONITOR
    getAllDataOtiMonitor: async (page: number, limit: number) => {
        const response: any = await api.get(`/oti-monitor/paginate?page=${page}&limit=${limit}`);
        return response.data.data;
    },
    getAllDataFilterOtiMonitor: async (query: string) => {
        const response: any = await api.get(`/oti-monitor/filter?query=${query}`);
        return response.data.data;
    },
    getByCodeOtiMonitor: async (code: string) => {
        const response: any = await api.get(`/oti-monitor/${code}`);
        return response.data.data;
    },
    getQrOtiMonitor: async (code: string) => {
        const response: any = await api.get(`/oti-monitor/qr/${code}`);
        return response.data.data;
    },
    saveOtiMonitor: async (data: IOtiMonitor) => {
        const response: any = await api.post(`/oti-monitor`, data);
        return response.data.data;
    },
    deleteOtiMonitor: async (code: string) => {
        const response: any = await api.delete(`/oti-monitor/${code}`);
        return response.data.data;
    },
    updateOtiMonitor: async (id: string, data: Partial<IOtiMonitor>) => {
        const response: any = await api.put(`/oti-monitor/${id}`, data);
        return response.data.data;
    },

    //USERS
    getAllDataUsers: async () => {
        const response: any = await api.get(`/users`)
        return response.data.data
    },
    saveUser: async (data: Partial<IUser>) => {
        const response: any = await api.post(`/users`, data)
        return response.data.data
    },
    updateUser: async (id: string, data: Partial<IUser>) => {
        const response: any = await api.put(`/users/${id}`, data)
        return response.data.data
    },
    LoginUser: async (data: IUser) => {
        const response: any = await api.post(`/users/login`, data)
        return response.data.data
    },
    DeleteUser: async (id: string) => {
        const response: any = await api.delete(`/users/${id}`)
        return response.data.data
    },
}