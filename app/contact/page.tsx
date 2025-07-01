import React from 'react'

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 space-y-6 mb-32">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-lg">Have questions, feedback, or need support? Reach out to me directly:</p>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mt-4 space-y-6">
        <div className="flex flex-col gap-4 justify-center pt-2">
          {/* Email Card */}
          <div className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 min-w-[220px] justify-center">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="text-blue-600 dark:text-blue-400"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z"/></svg>
            <span className="font-medium text-lg text-gray-800 dark:text-gray-200 select-all">kartikvaghasiya4477@gmail.com</span>
          </div>
          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/kartikey-vaghasiya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 min-w-[220px] justify-center"
          >
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="text-blue-700"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
            <span className="font-medium text-lg text-gray-800 dark:text-gray-200">kartikey-vaghasiya</span>
          </a>
          {/* GitHub Card */}
          <a
            href="https://github.com/k4rt1key"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 min-w-[220px] justify-center"
          >
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="text-gray-800 dark:text-gray-200"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.589 8.199-6.085 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span className="font-medium text-lg text-gray-800 dark:text-gray-200">k4rt1key</span>
          </a>
        </div>
      </div>
    </main>
  )
} 