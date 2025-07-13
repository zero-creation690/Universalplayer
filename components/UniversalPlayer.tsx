'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Track {
  language: string
  label?: string
  role?: string
}

interface UniversalPlayerProps {
  src: string
  onError?: (error: string) => void
  onLoadStart?: () => void
  onLoadEnd?: () => void
}

export default function UniversalPlayer({ 
  src, 
  onError, 
  onLoadStart, 
  onLoadEnd 
}: UniversalPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [audioTracks, setAudioTracks] = useState<Track[]>([])
  const [textTracks, setTextTracks] = useState<Track[]>([])
  const [currentAudioTrack, setCurrentAudioTrack] = useState<string>('')
  const [currentTextTrack, setCurrentTextTrack] = useState<string>('')
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false)
  const [shakaLoaded, setShakaLoaded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Load Shaka Player dynamically
  useEffect(() => {
    if (window.shaka) {
      setShakaLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.0/shaka-player.compiled.js'
    script.async = true
    script.onload = () => {
      if (window.shaka) {
        window.shaka.polyfill.installAll()
        setShakaLoaded(true)
      }
    }
    script.onerror = () => {
      onError?.('Failed to load Shaka Player')
    }
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [onError])

  // Initialize player
  const initPlayer = useCallback(async () => {
    if (!videoRef.current || !window.shaka || !shakaLoaded) return

    try {
      // Destroy existing player
      if (playerRef.current) {
        await playerRef.current.destroy()
      }

      // Check browser support
      if (!window.shaka.Player.isBrowserSupported()) {
        onError?.('Browser not supported')
        return
      }

      // Create new player
      playerRef.current = new window.shaka.Player(videoRef.current)

      // Set up error handling
      playerRef.current.addEventListener('error', (event: any) => {
        onError?.(event.detail?.message || 'Player error occurred')
      })

      return playerRef.current
    } catch (error) {
      onError?.(`Failed to initialize player: ${error}`)
      return null
    }
  }, [shakaLoaded, onError])

  // Load video source
  const loadVideo = useCallback(async (videoSrc: string) => {
    if (!videoSrc || !playerRef.current) return

    setIsLoading(true)
    onLoadStart?.()

    try {
      // Clear existing tracks
      setAudioTracks([])
      setTextTracks([])
      setCurrentAudioTrack('')
      setCurrentTextTrack('')
      setSubtitlesEnabled(false)

      // Load the video
      await playerRef.current.load(videoSrc)

      // Get available tracks
      const audioLanguages = playerRef.current.getAudioLanguages()
      const textLanguages = playerRef.current.getTextLanguages()

      // Format audio tracks
      const formattedAudioTracks = audioLanguages.map((track: any) => ({
        language: track.language,
        label: track.label || track.language,
        role: track.role,
      }))

      // Format text tracks
      const formattedTextTracks = textLanguages.map((track: any) => ({
        language: track.language,
        label: track.label || track.language,
        role: track.role,
      }))

      setAudioTracks(formattedAudioTracks)
      setTextTracks(formattedTextTracks)

      // Set default tracks
      if (formattedAudioTracks.length > 0) {
        setCurrentAudioTrack(formattedAudioTracks[0].language)
      }
      if (formattedTextTracks.length > 0) {
        setCurrentTextTrack(formattedTextTracks[0].language)
      }

      onLoadEnd?.()
    } catch (error: any) {
      onError?.(`Failed to load video: ${error.message || error}`)
    } finally {
      setIsLoading(false)
    }
  }, [onError, onLoadStart, onLoadEnd])

  // Initialize player when component mounts
  useEffect(() => {
    initPlayer()
  }, [initPlayer])

  // Load video when src changes
  useEffect(() => {
    if (src && playerRef.current) {
      loadVideo(src)
    }
  }, [src, loadVideo])

  // Handle audio track change
  const handleAudioTrackChange = (language: string) => {
    if (playerRef.current) {
      playerRef.current.selectAudioLanguage(language)
      setCurrentAudioTrack(language)
    }
  }

  // Handle text track change
  const handleTextTrackChange = (language: string) => {
    if (playerRef.current) {
      playerRef.current.selectTextLanguage(language)
      setCurrentTextTrack(language)
      setSubtitlesEnabled(true)
      playerRef.current.setTextTrackVisibility(true)
    }
  }

  // Toggle subtitles
  const toggleSubtitles = () => {
    if (playerRef.current) {
      const newState = !subtitlesEnabled
      setSubtitlesEnabled(newState)
      playerRef.current.setTextTrackVisibility(newState)
    }
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!videoRef.current) return

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [])

  if (!shakaLoaded) {
    return (
      <div className="flex items-center justify-center h-96 bg-netflix-darkgray rounded-lg">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-white/70">Loading Shaka Player...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden mb-6">
        <video
          ref={videoRef}
          className="w-full h-auto max-h-[70vh] object-contain"
          controls
          playsInline
          preload="metadata"
        />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-white">Loading video...</p>
            </div>
          </div>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 control-button"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      {/* Control Panel */}
      <div className="control-panel p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Audio Tracks */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Audio Tracks</h3>
            {audioTracks.length > 0 ? (
              <div className="space-y-2">
                {audioTracks.map((track) => (
                  <button
                    key={track.language}
                    onClick={() => handleAudioTrackChange(track.language)}
                    className={`control-button w-full text-left ${
                      currentAudioTrack === track.language ? 'active' : ''
                    }`}
                  >
                    {track.label || track.language}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-white/50 text-sm">No audio tracks available</p>
            )}
          </div>

          {/* Text Tracks */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Subtitles</h3>
            <div className="space-y-2">
              <button
                onClick={toggleSubtitles}
                className={`control-button w-full text-left ${
                  subtitlesEnabled ? 'active' : ''
                }`}
              >
                {subtitlesEnabled ? 'Hide Subtitles' : 'Show Subtitles'}
              </button>
              
              {textTracks.length > 0 && (
                <div className="ml-4 space-y-2">
                  {textTracks.map((track) => (
                    <button
                      key={track.language}
                      onClick={() => handleTextTrackChange(track.language)}
                      className={`control-button w-full text-left text-sm ${
                        currentTextTrack === track.language && subtitlesEnabled ? 'active' : ''
                      }`}
                      disabled={!subtitlesEnabled}
                    >
                      {track.label || track.language}
                    </button>
                  ))}
                </div>
              )}
              
              {textTracks.length === 0 && (
                <p className="text-white/50 text-sm ml-4">No subtitle tracks available</p>
              )}
            </div>
          </div>
        </div>

        {/* Player Info */}
        <div className="pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
            <div>
              <span className="font-medium">Audio Tracks:</span> {audioTracks.length}
            </div>
            <div>
              <span className="font-medium">Subtitle Tracks:</span> {textTracks.length}
            </div>
            <div>
              <span className="font-medium">Status:</span> {isLoading ? 'Loading...' : 'Ready'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
