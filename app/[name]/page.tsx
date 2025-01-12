// REACT - NEXT
// app/[name]/page.tsx
'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// UI
import DisplayCl1p from '@/components/DisplayCl1p'
import CreateCl1p from '@/components/CreateCl1p'
import SearchCl1p from '@/components/SearchCl1p'

import toast from 'react-hot-toast' 

// STORE
import UseCl1pZustand  from '@/lib/store'
import { InstructionCards } from '@/components/InstructionCards'

export default function Cl1pPage() {
    const router = useRouter()
    
    const name = UseCl1pZustand((state)=> state.name)
    const password = UseCl1pZustand((state)=> state.password)
    const trigger = UseCl1pZustand((state)=> state.trigger)
    const mode = UseCl1pZustand((state)=> state.mode)
    const isPassword = UseCl1pZustand((state)=> state.isPassword)
    const loading = UseCl1pZustand((state)=> state.loading)
    const cl1pData = UseCl1pZustand((state)=> state.cl1pData)

    const setName = UseCl1pZustand((state)=> state.setName)
    const setPassword = UseCl1pZustand((state)=> state.setPassword)
    const triggerNow = UseCl1pZustand((state)=> state.triggerNow)
    const setMode = UseCl1pZustand((state)=> state.setMode)
    const setIsPassword = UseCl1pZustand((state)=> state.setIsPassword)
    const setLoading = UseCl1pZustand((state)=> state.setLoading)
    const setCl1pData = UseCl1pZustand((state)=> state.setCl1pData)

    setName( usePathname().replace("/", ""))

    useEffect(() => {

        const fetchCl1pData = async () => {
            try {

                setLoading(true);
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: name, password: password })
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cl1p/search`, requestOptions)
                const jsonResponse = await response.json();

                setLoading(false);
                
                if (response.status == 401){
                    toast.error("WRONG CREDENTIALS")
                    setIsPassword(true);
                }

                if(response.status == 400 || response.status == 500){
                    toast.error(jsonResponse.message);
                }
                
                if(response.status == 404){
                    setMode('create')
                }
                
                if(response.status == 200){
                    router.push(`/${name}`)
                    setCl1pData(jsonResponse.data)
                    setMode('display')
                }

            } catch (error) {
                toast.error('An unexpected error occurred')
                console.error(error)
            }
        }

        if(!cl1pData){
            fetchCl1pData()
        }
    }, [name, trigger])

    if ( mode == 'create'){
        return <CreateCl1p propsName={name} propsPassword={password}/>
    }

    if ( mode == 'display'){
        return <DisplayCl1p propsName={name} propsData={cl1pData}/>
    }

    return (
        <>
        <SearchCl1p 
            propsName={name} 
            propsSetName={setName} 
            
            propsPassword={password} 
            propsSetPassword={setPassword}

            propsIsPassword={isPassword}
            propsSetIsPassword={setIsPassword}
            
            propsLoading={loading}
            propsSetLoading={setLoading}
            
            propsTriggerNow={triggerNow}
            
            fetchCl1pData={()=>{}}
            />
            <InstructionCards/>
            </>
    )
}

