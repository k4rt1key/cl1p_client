'use client'

import React, { useEffect, useState } from 'react'
import { SearchProps } from '@/types/types'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  useEffect(() => {
    setPropsNameState(propsName)
  },[propsName])

  useEffect(() => {
   fetchCl1pData()
  },[])

  useEffect(() => {
    if(propsIsPassword){
      propsSetIsPassword(false)
    }
  },[propsNameState])


  if (!propsSetName || !propsSetPassword) {
    throw new Error("Development Error !!!")
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/${propsNameState}`)
    propsTriggerNow()
    if(fetchCl1pData){
      fetchCl1pData()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <input
            id="name"
            type="text"
            placeholder="Enter cl1p name"
            value={propsNameState}
            onChange={(e) => {
              setPropsNameState(e.target.value)
              propsSetName(e.target.value)
            }}
            required
            className="w-full text-lg border-2 border-gray-200 py-2 px-3 rounded-xl "
          />
        </div>
        {propsIsPassword && (
          <div className="relative">
            <input
              id="password"
              type={passType}
              placeholder="Enter password"
              value={propsPassword}
              onChange={(e) => propsSetPassword(e.target.value)}
              required
              className="w-full text-lg py-2 px-3 border-2 border-gray-200 rounded-xl focus:outline-none border-2 border-gray-300"
            />
            <button
              type="button"
              onClick={() => setPassType(passType === 'password' ? 'text' : 'password')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {passType === 'password' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md transition-opacity duration-200 hover:opacity-90"
          disabled={propsLoading}
        >
          {propsLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2 h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

