'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

export default function PasswordGenerator() {
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const passwordRef = useRef<HTMLInputElement>(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) charset += "0123456789"
    if (charAllowed) charset += "!@#$%^&*-_+=[]{}~`"

    let pass = ""
    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * charset.length)
      pass += charset[charIndex]
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Password Generator</h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={password}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-lg"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                Password Length: {length}
              </label>
              <input
                type="range"
                id="length"
                min={6}
                max={30}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="numbers" className="text-sm font-medium text-gray-700">
                Include Numbers
              </label>
              <input
                type="checkbox"
                id="numbers"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="symbols" className="text-sm font-medium text-gray-700">
                Include Symbols
              </label>
              <input
                type="checkbox"
                id="symbols"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>

          <button
            onClick={passwordGenerator}
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  )
}