"use client"

import { useState } from "react"

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState("")
  const [submittedUrl, setSubmittedUrl] = useState("")

  const handlePlay = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedUrl(videoUrl.trim())
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🎥 UniversalPlayer</h1>

      <form onSubmit={handlePlay} className="w-full max-w-xl flex gap-2 mb-6">
        <input
          type="url"
          placeholder="Enter video URL (MP4, M3U8, etc.)"
          className="flex-grow p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded text-white font-semibold"
        >
          Play
        </button>
      </form>

      {submittedUrl && (
        <div className="w-full max-w-4xl aspect-video bg-black rounded overflow-hidden">
          <video
            src={submittedUrl}
            controls
            autoPlay
            className="w-full h-full object-contain rounded"
            playsInline
          />
        </div>
      )}
    </main>
  )
}
