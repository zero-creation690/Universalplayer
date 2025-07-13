# UniversalPlayer

A modern, universal video player built with Next.js 14+ and Shaka Player that supports all major video formats including MP4, HLS, DASH, and more.

## 🚀 Features

- **Universal Format Support**: MP4, HLS (.m3u8), DASH (.mpd), WebM, and progressive download
- **Multi-Audio Support**: Automatically detects and allows switching between audio tracks
- **Subtitle Management**: Full subtitle support with toggle visibility and track switching
- **Responsive Design**: Netflix-like dark theme with mobile-friendly interface
- **Streaming Ready**: Works with popular hosting services like Google Drive, Pixeldrain, CDNs
- **Modern Tech Stack**: Next.js 14+ App Router, React, TypeScript, Tailwind CSS
- **Performance Optimized**: Dynamic Shaka Player loading, efficient rendering
- **Error Handling**: Comprehensive error handling and loading states

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/universalplayer.git
cd universalplayer

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🎯 Usage

1. **Enter Video URL**: Input any supported video URL in the text field
2. **Sample Videos**: Try the pre-loaded sample videos to test functionality
3. **Audio Tracks**: Switch between available audio languages
4. **Subtitles**: Toggle subtitles on/off and switch between subtitle tracks
5. **Fullscreen**: Use the fullscreen button for immersive viewing

## 🔧 Technical Details

### Architecture

- **Frontend**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with Netflix-inspired design
- **Video Engine**: Shaka Player (dynamically loaded from CDN)
- **Language**: TypeScript with proper type definitions
- **Build Tool**: Next.js built-in bundler

### File Structure

```
universalplayer/
├── app/
│   ├── layout.tsx          # App Router layout
│   └── page.tsx            # Main page component
├── components/
│   └── UniversalPlayer.tsx # Core player component
├── styles/
│   └── globals.css         # Global styles with Tailwind
├── types/
│   └── shaka.d.ts          # Shaka Player TypeScript definitions
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

### Key Components

- **UniversalPlayer**: Main video player component with Shaka integration
- **Dynamic Loading**: Shaka Player loaded dynamically from CDN
- **Track Management**: Automatic audio/subtitle track detection and switching
- **Error Handling**: Comprehensive error states and user feedback
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## 🎨 Customization

### Styling

The app uses Tailwind CSS with a Netflix-inspired color scheme:

```css
colors: {
  netflix: {
    black: '#141414',
    red: '#E50914',
    darkgray: '#222222',
    gray: '#333333',
    lightgray: '#555555',
  }
}
```

### Adding New Features

1. **Custom Controls**: Extend the player controls in `UniversalPlayer.tsx`
2. **New Formats**: Shaka Player automatically handles format detection
3. **Theming**: Modify the Tailwind configuration and CSS variables
4. **Analytics**: Add event tracking for user interactions

## 🔍 Supported Formats

### Video Formats
- MP4 (H.264, H.265/HEVC)
- WebM (VP8, VP9, AV1)
- HLS (.m3u8)
- DASH (.mpd)

### Audio Formats
- AAC
- MP3
- Opus
- AC-3

### Subtitle Formats
- WebVTT
- TTML
- SRT (via conversion)

## 🌐 Compatible Sources

- Direct video file URLs
- Google Drive (public sharing links)
- Pixeldrain
- CDN-hosted videos
- Streaming service APIs
- Self-hosted content

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure video sources have proper CORS headers
2. **Format Not Supported**: Check if the URL is accessible and format is supported
3. **Loading Issues**: Verify internet connection and URL validity
4. **Mobile Playback**: Some mobile browsers have autoplay restrictions

### Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers with MSE support

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review Shaka Player documentation

---

Built with ❤️ using Next.js, React, and Shaka Player
