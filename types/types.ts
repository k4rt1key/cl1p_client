export interface SearchProps {
    propsName: string,
    propsSetName :  (name: string) => void ,
    propsPassword: string,
    propsSetPassword:(password: string) => void
    propsIsPassword: boolean,
    propsSetIsPassword: (isPassword: boolean) => void
    propsLoading: boolean,
    propsSetLoading: (loading: boolean) => void

    fetchCl1pData :(() => void) | null | undefined
    propsTriggerNow:() => void
}

export interface DisplayProps {
    propsName: string,
    propsData : Cl1pType | null,
}

export interface CreateProps {
    propsName: string,
    propsPassword: string,
}

export interface Cl1pType {
    text: string
    files: string[]
    expiry: string
}
  
export interface Cl1pZustandType {
    name: string,
    password: string,
    mode: 'create' | 'display' | 'search'
    trigger: number,
    isPassword: boolean,
    loading: boolean,
    cl1pData: Cl1pType | null,    

    setName: (name: string) => void 
    setPassword: (password: string) => void
    setMode: (mode: 'create' | 'display' | 'search') => void
    triggerNow: () => void
    setIsPassword: (isPassword: boolean) => void
    setLoading: (loading: boolean) => void
    setCl1pData: ( cl1pData: Cl1pType | null) => void
}