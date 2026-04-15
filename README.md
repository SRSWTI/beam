# Bodega Beam

Send files directly from your browser to anyone, anywhere. No uploads to servers. No file size limits. Just a direct, encrypted connection between you and the person receiving your files.

## Yeah how it works though?

Bodega Beam is a peer-to-peer file sharing tool. You pick files, get a link, and the person with that link can download them straight from your browser. Your files never touch our servers. When you close your browser tab, the files are gone.

## Why We Built This

It is weird that sending a file to someone sitting next to you requires uploading it to Google Drive or Dropbox first. Both of you have internet-connected devices. Both of you have browsers. Why does your file need to detour through a data center on another continent?

We built Bodega Beam because the current way of sharing files is backwards. Your laptop can send a 10GB video directly to your friend's phone. No cloud storage needed. No upload queues. No privacy policies to read.

Direct browser-to-browser connections. Your files stay between you and the person receiving them.

## How It Works (Simple Version)

1. You open Bodega Beam and select files
2. We create a unique link (like `bodega.beam/drawn-signal-tower`)
3. You share that link with someone
4. When they open it, their browser connects directly to yours
5. Files transfer encrypted, browser-to-browser
6. No accounts. No cloud storage. No tracking.


### WebRTC Peer-to-Peer Architecture

Bodega Beam uses WebRTC (Web Real-Time Communication) to establish a direct peer-to-peer connection between the sender and receiver's browsers:

```
Sender (Uploader)                    Receiver (Downloader)
       |                                      |
       |  1. Creates a channel with unique ID   |
       |--------------------------------------->|
       |     (stored temporarily in Redis)      |
       |                                      |
       |  2. Receiver opens download link       |
       |<---------------------------------------|
       |     (fetches channel info from API)    |
       |                                      |
       |  3. WebRTC peer connection established |
       |<=======================================>|
       |     (direct browser-to-browser)        |
       |                                      |
       |  4. File chunks stream directly        |
       |=======================================>|
       |     (no server involvement)            |
```

### File Transfer Protocol

The application implements a custom message-based protocol for reliable file transfer:

```typescript
// Message types exchanged between peers
type MessageType =
  | 'RequestInfo'      // Downloader requests file info
  | 'Info'             // Uploader sends file metadata
  | 'Start'            // Downloader ready to receive
  | 'Chunk'            // File data chunk
  | 'ChunkAck'         // Chunk received confirmation
  | 'Pause'            // Pause transfer
  | 'Done'             // Transfer complete
  | 'Error'            // Transfer error
  | 'PasswordRequired' // Files are password protected
  | 'UsePassword'      // Downloader submits password
  | 'Report'           // Report terms violation
```

Files are chunked into 256KB pieces for efficient transfer:

```
Large File (100 MB)
       |
       | Chunk 1 (256KB)  ------------------->
       | Chunk 2 (256KB)  ------------------->
       | Chunk 3 (256KB)  ------------------->
       | ...
       | Chunk N (256KB)  ------------------->
       |
       |<--------- ACK for each chunk --------
```

### File Transfer Protocol (continued)

The application implements a custom message-based protocol for reliable file transfer:

```typescript
// Message types exchanged between peers
type MessageType =
  | 'RequestInfo'      // Downloader requests file info
  | 'Info'             // Uploader sends file metadata
  | 'Start'            // Downloader ready to receive
  | 'Chunk'            // File data chunk
  | 'ChunkAck'         // Chunk received confirmation
  | 'Pause'            // Pause transfer
  | 'Done'             // Transfer complete
  | 'Error'            // Transfer error
  | 'PasswordRequired' // Files are password protected
  | 'UsePassword'      // Downloader submits password
  | 'Report'           // Report terms violation
```

Files are chunked into 256KB pieces for efficient transfer:

```
Large File (100 MB)
       |
       | Chunk 1 (256KB)  ------------------->
       | Chunk 2 (256KB)  ------------------->
       | Chunk 3 (256KB)  ------------------->
       | ...
       | Chunk N (256KB)  ------------------->
       |
       |<--------- ACK for each chunk --------
```

## Security Model

### Why Bodega Beam Is Secure

**1. No Server Storage**

Files never touch our servers. The only server-side component is a lightweight channel metadata store:

```typescript
interface Channel {
  id: string           // Unique channel identifier
  shortSlug: string    // Short URL slug (8 chars)
  longSlug: string     // Memorable slug (4 words)
  peerId: string       // WebRTC peer identifier
  files: FileInfo[]    // File metadata only (name, size, type)
  password?: string    // Optional password hash
  ttl: number          // Expiration timestamp
}
```

**2. End-to-End Encryption via WebRTC**

All WebRTC connections use DTLS (Datagram Transport Layer Security) for encryption:

```
DTLS Handshake (built into WebRTC)
       |
       | 1. Certificate exchange
       | 2. Key derivation
       | 3. Encrypted data channel
       |
Result: All file chunks encrypted in transit
```

**3. Ephemeral Channels**

Channels automatically expire after 24 hours. No persistent state:

```typescript
// Channel TTL configuration
const CHANNEL_TTL_SECONDS = 24 * 60 * 60  // 24 hours
```

**4. Optional Password Protection**

Uploaders can add passwords. The password is never sent to the server:

```
Password Flow:
1. Uploader sets password locally
2. Password hash stored in channel (not plaintext)
3. Downloader must send correct password via WebRTC
4. Uploader validates locally before sending chunks
```

**5. No Tracking or Analytics**

No third-party analytics, no cookies for tracking, no file metadata logging.

## Architecture

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript |
| P2P Connection | PeerJS (WebRTC abstraction) |
| State Management | TanStack Query |
| Testing | Vitest (unit) + Playwright (E2E) |
| Theming | next-themes with View Transitions |
| Optional Storage | Redis (channel metadata only) |

### Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── create/route.ts     # Create upload channel
│   │   ├── ice/route.ts        # TURN/STUN server config
│   │   └── report/route.ts     # Report abuse
│   ├── download/[...slug]/     # Download page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Upload page
├── components/
│   ├── Uploader.tsx            # Upload UI + QR code
│   ├── Downloader.tsx          # Download UI
│   ├── WebRTCProvider.tsx      # PeerJS context
│   └── ui/                     # UI components
├── hooks/
│   ├── useUploaderConnections.ts # Manage peer connections
│   ├── useDownloader.ts          # Download logic
│   └── useUploaderChannel.ts     # Channel creation
├── channel.ts                  # Channel storage abstraction
├── messages.ts                 # WebRTC message schemas
├── slugs.ts                    # Unique slug generation
└── types.ts                    # TypeScript definitions
```

### Data Flow

```
Upload Flow:
1. User selects files
2. Client POST /api/create -> receives channel + peerId
3. WebRTC peer initialized
4. Uploader displays QR code + URLs
5. Waits for downloader connections

Download Flow:
1. User opens /download/{slug}
2. Server fetches channel metadata
3. Client initializes WebRTC peer
4. Connects to uploader's peerId
5. Negotiates file transfer
6. Streams chunks to browser download
```

## Current TODOs and Improvements

The codebase includes several planned improvements marked with TODO comments:

### Performance

```typescript
// src/config.ts
// TODO: Performance - Make CHUNK_SIZE dynamic based on network conditions
// Smaller chunks for slow/mobile networks, larger for fast connections

// src/hooks/useUploaderConnections.ts
// TODO: Performance - Add congestion control (reduce chunk size when timeouts occur)
// TODO: Performance - Implement true resume (track received chunks, not just last index)
```

### Security Enhancements

```typescript
// src/hooks/useDownloader.ts
// TODO: Security - Consider if password should be hashed client-side before sending
// Currently sent plaintext over encrypted WebRTC channel

// src/types.ts
// TODO: Security - Validate file types on upload (optional virus scanning via ClamAV)
// TODO: Security - Add file size limits per file and total
```

### UX Improvements

```typescript
// src/components/Uploader.tsx
// TODO: UX - Add connection quality indicator (latency, packet loss)
// TODO: UX - Add one-click URL copy button with visual feedback
// TODO: UX - Debounce status updates to reduce re-renders

// src/components/Downloader.tsx
// TODO: UX - Show download speed and estimated time remaining
// TODO: Accessibility - Add screen reader announcements for progress
```

### Code Quality

```typescript
// src/utils/download.ts
// TODO: Code Quality - Extract duplicate streaming logic into shared utility
// TODO: Performance - Add download speed throttling option

// src/types.ts
// TODO: Code Quality - Replace 'any' types with proper TypeScript definitions
```

### Dependencies

```json
// package.json
"_todo_deps": "Review if 'three' and 'animejs' can be replaced with Framer Motion. Remove 'webrtcsupport' - modern browsers all support WebRTC"
```

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm (preferred package manager)

### Installation

```bash
git clone <repository>
cd bodega-beam
pnpm install
```

### Development

```bash
# Basic development server
pnpm dev

# Full WebRTC testing with Redis + COTURN
pnpm dev:full
```

### Building

```bash
pnpm build
```

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Full CI pipeline
pnpm ci
```

## WebRTC Development Setup

For testing behind NAT/firewalls, start the full development stack:

```bash
pnpm dev:full
```

This starts:
- Next.js dev server
- Redis (channel storage)
- COTURN (TURN/STUN server for NAT traversal)

## Contributing

We welcome contributions! Please follow these guidelines:

### Code Style

- Use TypeScript for all new code
- Use function syntax for React components with inline prop types
- Export values on the same line as definition
- Always define return types for functions
- Use Tailwind CSS for styling
- No trailing semicolons

### Before Submitting

```bash
pnpm ci
```

This runs: lint, format check, type check, unit tests, build, E2E tests, and Docker build.

### Commit Message Format

Use clear, descriptive commit messages:

```
feat: add password protection
fix: resolve chunk timeout issue
docs: update README with security details
refactor: extract streaming utilities
test: add E2E tests for multi-file download
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run `pnpm ci` to ensure everything passes
5. Submit a pull request with a clear description

### Areas Needing Help

- Improving test coverage for WebRTC edge cases
- Implementing dynamic chunk sizing based on network conditions
- Adding file type validation and virus scanning
- Improving accessibility (ARIA labels, screen reader support)
- Mobile UI/UX improvements

## License

Do whatever you want w it

## Acknowledgments

- WebRTC technology enables the peer-to-peer magic
- PeerJS provides the WebRTC abstraction
- StreamSaver.js enables streaming file downloads
- Zip-stream implementation for multi-file downloads
