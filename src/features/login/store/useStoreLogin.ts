import { create } from 'zustand';


interface ILogin {
    isLogIn: boolean;
    name: string;
    login: (name: string) => void;
    logout: () => void;
}



const useStoreLogin = create<ILogin>((set) => ({
    isLogIn: false,
    name: "",
    login: (name) => set(() => ({ isLogIn: true, name })),
    logout: () => set(() => ({ isLogIn: false, name: "" }))
}));

export default useStoreLogin;