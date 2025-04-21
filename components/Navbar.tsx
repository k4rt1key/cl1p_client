'use client'
import { useState, useEffect } from 'react'
import { Forward, Clipboard } from 'lucide-react'
import UseCl1pZustand from '@/lib/store'


export function Navbar() {
    const [mounted, setMounted] = useState(false)

    // Destructure all state setters for cleaner code
    const {
        setName,
        setPassword,
        setMode,
        setIsPassword,
        setLoading,
        setCl1pData
    } = UseCl1pZustand()

    const handleHomeClick = () => {
        // Reset all state
        setName('');
        setPassword('');
        setMode('search');
        setIsPassword(false);
        setLoading(false);
        setCl1pData(null);

        // Navigate to home
        window.location.href = '/'
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }



    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
            <div className="relative w-full max-w-3xl">
                <div className="absolute inset-0 bg-background/30 backdrop-blur-md rounded-full" />
                <nav className="relative bg-background/70 backdrop-blur-sm rounded-full shadow-lg">
                    <div className="px-8 sm:px-16 py-3 flex justify-between items-center">
                        <button
                            onClick={handleHomeClick}
                            className="flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                            <Forward className="h-6 w-6 mr-2" />
                            <span className="font-bold text-sm sm:text-lg">Back to Home</span>
                        </button>
                        <button
                            className="flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                            <Clipboard className="h-6 w-6 mr-2" />
                            <span className="font-bold text-sm sm:text-lg"> Cl1p.in </span>
                        </button>

                    </div>
                </nav>
            </div>
        </div>
    )
}