import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

interface FeatureItem {
  title: string
  description: string
}

const features: FeatureItem[] = [
  {
    title: "cross-platform webrtc compatibility",
    description: "native support across all modern browsers including  safari, chrome mobile, and progressive web app environments. utilizes webrtc datachannels with sctp (stream control transmission protocol) for reliable, ordered data delivery."
  },
  {
    title: "direct p2p architecture",
    description: "eliminates traditional client-server bottlenecks through direct browser-to-browser webrtc connections. implements optimized ice (interactive connectivity establishment) negotiation with stun/turn fallbacks for nat traversal and enhanced connection establishment speed."
  },
  {
    title: "real-time transfer monitoring",
    description: "comprehensive bandwidth utilization tracking with per-peer connection metrics. features granular progress monitoring, connection state management, and graceful transfer interruption capabilities with proper peer notification protocols."
  },
  {
    title: "multi-layer security framework",
    description: "dtls 1.2 encryption for all webrtc communications combined with optional aes-256-gcm password-based encryption. implements cryptographically secure random uuid generation for transfer sessions and content integrity verification through sha-256 checksums."
  },
  {
    title: "concurrent multi-file streaming",
    description: "supports atomic multi-file uploads with automatic zip compression using streaming algorithms. implements chunked transfer encoding for memory-efficient handling of large file collections without browser memory constraints."
  },
]

export default function TechnicalFeatures(): React.ReactElement {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-medium text-white/80 text-center mb-8 drop-shadow-lg">
        technical features
      </h2>
      
      <Accordion className="w-full" type="single" collapsible>
        {features.map((feature, index) => (
          <AccordionItem key={index} value={`feature-${index}`} className="mb-4">
            <AccordionTrigger className="text-left">
              {feature.title}
            </AccordionTrigger>
            <AccordionContent>
              {feature.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
} 