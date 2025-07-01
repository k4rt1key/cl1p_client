'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import UseCl1pZustand from '@/lib/store'
import Link from 'next/link'

export function Navbar() {
    const [mounted, setMounted] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

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
        <>
            {/* Mobile Hamburger - only show when sidebar is closed */}
            {!sidebarOpen && (
                <button
                    aria-label="Open sidebar menu"
                    className="fixed top-2 left-2 z-50 md:hidden bg-white dark:bg-gray-900 p-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
                </button>
            )}
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen min-h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex justify-between flex-col z-40 transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block md:w-64 md:h-screen md:min-h-screen w-full max-w-xs`}
                aria-label="Sidebar navigation"
            >
                {/* Close button for mobile sidebar */}
                {sidebarOpen && (
                    <button
                        aria-label="Close sidebar menu"
                        className="absolute top-2 right-2 z-50 md:hidden bg-white dark:bg-gray-900 p-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-6 w-6 text-gray-800 dark:text-white" />
                    </button>
                )}
                {/* Top content */}
                <div>
                    {/* Logo and Home */}
                    <div className="flex items-center space-x-3 mb-2 mt-0 p-4">
                        <button onClick={handleHomeClick} aria-label="Go to home">
                            <img src="/favicon.ico" alt="Cl1p Logo" className="h-10 w-10" />
                        </button>
                        <span className="text-xl font-bold text-gray-800 dark:text-white">Cl1p</span>
                    </div>
                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 px-4">
                        <button onClick={handleHomeClick} className="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-left">Home</button>
                        <Link href="/about" className="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">About</Link>
                        <Link href="/contact" className="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">Contact</Link>
                        <Link href="/privacy-policy" className="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">Privacy Policy</Link>
                    </nav>
                </div>
                {/* Footer always at the bottom */}
                <footer className="text-xs text-gray-500 dark:text-gray-400 p-4 mt-auto">
                    &copy; 2025 Cl1p by Kartikey
                </footer>
            </aside>
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar overlay"
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => { if (e.key === 'Escape') setSidebarOpen(false) }}
                ></div>
            )}
        </>
    )
}