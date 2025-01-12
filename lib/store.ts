import { create } from 'zustand';
import { Cl1pType, Cl1pZustandType } from '@/types/types';

const UseCl1pZustand = create<Cl1pZustandType>((set) => ({
    name: '',
    password: '',
    trigger: 0,
    isPassword: false,
    loading: false,
    cl1pData: null,
    mode: 'search',

    setName: (name: string) => set({name: name}),
    setPassword: (password: string) => set({password: password}),
    setIsPassword: (isPassword: boolean) => set({isPassword: isPassword}),
    triggerNow: () => set((state) => ({trigger: state.trigger+1})),
    setLoading: (loading: boolean) => set({loading: loading}),
    setCl1pData: (cl1pData: Cl1pType | null) => set({cl1pData: cl1pData}),
    setMode: (mode: 'create' | 'search' | 'display') => set({mode: mode}),

}));

export default UseCl1pZustand;
