"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
  videoUrl: string
}

export default function UniversalPlayer({ videoUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)

  const [audioTracks, setAudioTracks] = useState<string[]>([])
  const [subtitleTracks, setSubtitleTracks] = useState<string[]>([])
  const [selectedAudio, setSelectedAudio] = useState<string>("")
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>("")

  useEffect(() => {
    const loadShaka = async () => {
      // Dynamically load shaka-player script
      if (!window.shaka) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script")
          script.src = "https://cdn.jsdelivr.net/npm/shaka-player@4.3.5/dist/shaka-player.compiled.js"
          script.async = true
          script.onload = () => resolve()
          script.onerror = () => reject(new Error("Shaka Player failed to load"))
          document.body.appendChild(script)
        })
      }

      if (!window.shaka || !videoRef.current) return
      window.shaka.polyfill.installAll()
      const player = new window.shaka.Player(videoRef.current)
      playerRef.current = player

      try {
        await player.load(videoUrl)

        const variants = player.getVariantTracks()
        const uniqueLangs = [...new Set(variants.map((t) => t.language))]
        setAudioTracks(uniqueLangs)
        setSelectedAudio(player.getAudioLanguages()[0] || "")

        const subs = player.getTextTracks().map((t) => t.language)
        setSubtitleTracks(subs)
        setSelectedSubtitle(player.getTextLanguages()[0] || "")
      } catch (error) {
        console.error("Load error:", error)
      }
    }

    loadShaka()

    return () => {
      playerRef.current?.destroy()
    }
  }, [videoUrl])

  const switchAudio = (lang: string) => {
    playerRef.current?.selectAudioLanguage(lang)
    setSelectedAudio(lang)
  }

  const switchSubtitle = (lang: string) => {
    if (lang === "off") {
      playerRef.current?.setTextTrackVisibility(false)
      setSelectedSubtitle("")
    } else {
      playerRef.current?.selectTextLanguage(lang)
      playerRef.current?.setTextTrackVisibility(true)
      setSelectedSubtitle(lang)
    }
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full bg-black rounded"
        controls
        autoPlay
        playsInline
      />

      {audioTracks.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/80 p-2 rounded shadow text-white z-50">
          <label className="block mb-1 text-sm">Audio</label>
          <select
            value={selectedAudio}
            onChange={(e) => switchAudio(e.target.value)}
            className="bg-gray-800 px-3 py-1 rounded"
          >
            {audioTracks.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      {subtitleTracks.length > 0 && (
        <div className="absolute top-20 right-4 bg-black/80 p-2 rounded shadow text-white z-50">
          <label className="block mb-1 text-sm">Subtitles</label>
          <select
            value={selectedSubtitle || "off"}
            onChange={(e) => switchSubtitle(e.target.value)}
            className="bg-gray-800 px-3 py-1 rounded"
          >
            <option value="off">Off</option>
            {subtitleTracks.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
