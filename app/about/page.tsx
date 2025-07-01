import React from 'react'

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-4xl font-bold mb-4">About Cl1p</h1>
      <p className="text-lg">Cl1p is a simple and secure platform for sharing files and text instantly with anyone, anywhere. Built with privacy and ease-of-use in mind, Cl1p helps you transfer information quickly without hassle.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">About the Developer</h2>
      <p className="text-lg">Hi, I'm Kartikey, a passionate software developer. I created Cl1p to make sharing information fast, secure, and accessible for everyone. My goal is to build tools that empower users and respect their privacy.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Why Cl1p?</h2>
      <ul className="list-disc pl-6 text-lg space-y-2">
        <li>Instant file and text sharing with secure links</li>
        <li>No registration required</li>
        <li>Privacy-focused: your data is never sold or misused</li>
        <li>Easy to use on any device</li>
      </ul>
    </main>
  )
} 