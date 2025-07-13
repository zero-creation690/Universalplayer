'use client'

import { useState } from 'react'
import UniversalPlayer from '@/components/UniversalPlayer'

const SAMPLE_URLS = [
  {
    name: 'Big Buck Bunny (MP4)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    name: 'Sintel (MP4)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    name: 'Tears of Steel (MP4)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    name: 'HLS Stream Example',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    name: 'DASH Stream Example',
    url: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd'
  }
]

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoUrl.trim()) return
    
    setError('')
    setCurrentUrl(videoUrl.trim())
  }

  const handleSampleSelect = (url: string) => {
    setVideoUrl(url)
    setError('')
    setCurrentUrl(url)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setIsLoading(false)
  }

  const handleLoadStart = () => {
    setIsLoading(true)
    setError('')
  }

  const handleLoadEnd = () => {
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Header */}
      <header className="bg-netflix-darkgray border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">UniversalPlayer</h1>
              <p className="text-white/70 mt-1">Stream any video with advanced format support</p>
            </div>
            <div className="text-sm text-white/50">
              Powered by Shaka Player
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Input Section */}
        <div className="mb-8">
          <div className="bg-netflix-darkgray rounded-lg p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Enter Video URL</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter video URL (MP4, HLS, DASH, etc.)"
                  className="url-input flex-1"
                />
                <button
                  type="submit"
                  disabled={!videoUrl.trim() || isLoading}
                  className="control-button bg-netflix-red border-netflix-red hover:bg-netflix-red/80 disabled:opacity-50 disabled:cursor-not-allowed px-6"
                >
                  {isLoading ? 'Loading...' : 'Load Video'}
                </button>
              </div>
            </form>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-600/20 border border-red-600/50 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Sample URLs */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-3">Try Sample Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SAMPLE_URLS.map((sample) => (
                  <button
                    key={sample.url}
                    onClick={() => handleSampleSelect(sample.url)}
                    className="control-button text-left p-3 hover:bg-white/15"
                    disabled={isLoading}
                  >
                    <div className="font-medium text-white">{sample.name}</div>
                    <div className="text-white/60 text-xs mt-1 truncate">{sample.url}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        {currentUrl && (
          <div className="mb-8">
            <UniversalPlayer
              src={currentUrl}
              onError={handleError}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
            />
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-netflix-darkgray rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">📹 Universal Format Support</h3>
            <p className="text-white/70 text-sm">
              Supports MP4, HLS, DASH, WebM, and more. Works with popular hosting services like Google Drive, Pixeldrain, and direct URLs.
            </p>
          </div>
          
          <div className="bg-netflix-darkgray rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">🎵 Multi-Audio Support</h3>
            <p className="text-white/70 text-sm">
              Automatically detects and allows switching between multiple audio tracks and languages for enhanced accessibility.
            </p>
          </div>
          
          <div className="bg-netflix-darkgray rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">📝 Subtitle Management</h3>
            <p className="text-white/70 text-sm">
              Full subtitle support with the ability to toggle visibility and switch between different subtitle tracks.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-netflix-darkgray rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">📋 How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-2">Supported Formats</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• MP4 (H.264, H.265)</li>
                <li>• HLS (.m3u8)</li>
                <li>• DASH (.mpd)</li>
                <li>• WebM</li>
                <li>• Progressive download</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-2">Popular Sources</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Direct file URLs</li>
                <li>• Google Drive (public links)</li>
                <li>• Pixeldrain</li>
                <li>• CDN-hosted videos</li>
                <li>• Streaming services APIs</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600/50 rounded-lg">
            <p className="text-blue-300 text-sm">
              <strong>Tip:</strong> For best results, use direct video URLs or properly configured CORS-enabled sources. 
              Some platforms may require specific headers or authentication.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-netflix-darkgray border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-white/50 text-sm">
              Built with Next.js 14, React, Shaka Player, and Tailwind CSS
            </p>
            <p className="text-white/30 text-xs mt-2">
              UniversalPlayer - Stream any video format with ease
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
