// REACT - NEXT
// app/page.tsx
'use client'
import { useRouter } from 'next/navigation'

// UI
import CreateCl1p from '@/components/CreateCl1p'
import SearchCl1p from '@/components/SearchCl1p'
import { InstructionCards } from '@/components/InstructionCards'

import toast from 'react-hot-toast'

// STORE
import UseCl1pZustand from '@/lib/store'

export default function Cl1pPage() {
    const router = useRouter()

    const name = UseCl1pZustand((state) => state.name)
    const password = UseCl1pZustand((state) => state.password)
    const mode = UseCl1pZustand((state) => state.mode)
    const isPassword = UseCl1pZustand((state) => state.isPassword)
    const loading = UseCl1pZustand((state) => state.loading)
    const cl1pData = UseCl1pZustand((state) => state.cl1pData)

    const setName = UseCl1pZustand((state) => state.setName)
    const setPassword = UseCl1pZustand((state) => state.setPassword)
    const triggerNow = UseCl1pZustand((state) => state.triggerNow)
    const setMode = UseCl1pZustand((state) => state.setMode)
    const setIsPassword = UseCl1pZustand((state) => state.setIsPassword)
    const setLoading = UseCl1pZustand((state) => state.setLoading)
    const setCl1pData = UseCl1pZustand((state) => state.setCl1pData)

    if(cl1pData){
        setLoading(true);
    }

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

            const response = await fetch(`/api/cl1p/search`, requestOptions)
            const jsonResponse = await response.json();
            setLoading(false);

            
            if (response.status == 401) {
                // toast.error("ENTER VALID CREDENTIALS")
                setIsPassword(true);
            }

            if (response.status == 500) {
                toast.error(jsonResponse.message);
            }

            if (response.status == 404) {
                setMode('create')
            }
            
            if (response.status == 200) {
                router.push(`/${name}`)
                setCl1pData(jsonResponse.data)
                setMode('display')
            }
            
        } catch (err) {
            toast.error('An unexpected error occurred')
            setLoading(false);
            console.error(err)
        }
    }
   

    if (mode == 'create') {
        return <CreateCl1p propsName={name} propsPassword={password} />
    }

    if (mode == 'display') {
        router.push(`/${name}`)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-2 sm:p-8">
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

                fetchCl1pData={fetchCl1pData}
            />
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-6 text-white text-center">How to Use Cl1p</h2>
                <InstructionCards />
            </div>
        </main>
    )

}

