// REACT - NEXT
// app/page.tsx
'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useCallback, useRef } from 'react'

// UI
import CreateCl1p from '@/components/CreateCl1p'
import SearchCl1p from '@/components/SearchCl1p'
import { InstructionCards } from '@/components/InstructionCards'

import toast from 'react-hot-toast'

// STORE
import UseCl1pZustand from '@/lib/store'

export default function Cl1pPage() {
    const router = useRouter()
    const isSearchingRef = useRef(false)

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

    // Move setLoading call to useEffect to avoid setState during render
    useEffect(() => {
        if(cl1pData){
            setLoading(true);
        }
    }, [cl1pData, setLoading]);

    const fetchCl1pData = useCallback(async () => {
        // Prevent multiple simultaneous searches
        if (isSearchingRef.current) {
            return;
        }
        
        isSearchingRef.current = true;
        
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
                if (password != '') {
                    toast.error('Please enter a valid password')
                }
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
        } finally {
            isSearchingRef.current = false;
        }
    }, [name, password, router, setCl1pData, setIsPassword, setLoading, setMode]);

    // Auto-trigger search when name or password changes
    useEffect(() => {
        if (name && mode === 'search' && !cl1pData && !isSearchingRef.current) {
            // Add a small delay to prevent rapid successive calls during development
            const timeoutId = setTimeout(() => {
                fetchCl1pData();
            }, 100);
            
            return () => clearTimeout(timeoutId);
        }
    }, [name, password, mode, cl1pData, fetchCl1pData]);

    if (mode == 'create') {
        return <CreateCl1p propsName={name} propsPassword={password} />
    }

    if (mode == 'display') {
        router.push(`/${name}`)
    }

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Cl1p
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Share files and text instantly with secure links
                    </p>
                </div>

                {/* Search Section */}
                <div className="flex justify-center">
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
                </div>

                {/* Instructions Section */}
                <div>
                    <InstructionCards />
                </div>
            </div>
        </main>
    )
}

