'use client'

import React, { useEffect, useState } from 'react'
import { SearchProps } from '@/types/types'
import { useRouter } from 'next/navigation'
import { Search, Eye, EyeOff } from 'lucide-react'

export default function SearchCl1p({
  propsName,
  propsPassword,
  propsSetName,
  propsSetPassword,
  propsSetIsPassword,
  propsIsPassword,
  propsLoading,
  propsTriggerNow,
  fetchCl1pData,
}: SearchProps) {
  const [passType, setPassType] = useState<'text' | 'password'>('password')
  const [propsNameState, setPropsNameState] = useState<string>(propsName)
  const [localPassword, setLocalPassword] = useState<string>(propsPassword)
  const router = useRouter()

  useEffect(() => {
    setPropsNameState(propsName)
  },[propsName])

  useEffect(() => {
    setLocalPassword(propsPassword)
  },[propsPassword])

  if (!propsSetName || !propsSetPassword) {
    throw new Error("Development Error !!!")
  }

  // useEffect(() => {
  //   console.log(propsNameState)
  // },[propsNameState])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    propsSetName(propsNameState)
    propsSetPassword(localPassword) // Only update global password state on submit
    router.push(`/${propsNameState}`)
    propsTriggerNow()
    if(fetchCl1pData){
      fetchCl1pData()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-minimal p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Cl1p Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter cl1p name"
              value={propsNameState}
              onChange={(e) => {
                setPropsNameState(e.target.value)
                propsSetIsPassword(false)
                propsSetPassword('')
                setLocalPassword('')
              }}
              required
              className="input-minimal"
            />
          </div>
          
          {propsIsPassword && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={passType}
                  placeholder="Enter password"
                  value={localPassword}
                  onChange={(e) => setLocalPassword(e.target.value)}
                  required
                  className="input-minimal pr-10"
                />
                <button
                  type="button"
                  onClick={() => setPassType(passType === 'password' ? 'text' : 'password')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {passType === 'password' ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={propsLoading}
            className="btn-minimal w-full"
          >
            {propsLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-black mr-2"></div>
                Searching...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Search className="w-4 h-4 mr-2" />
                Search
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

