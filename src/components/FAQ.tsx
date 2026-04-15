'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "how are my files sent?",
    answer: "your files are sent directly from your browser to the downloader's browser using peer-to-peer webrtc technology. they never pass through our servers or any third-party infrastructure. bodega beam establishes direct encrypted channels between peers, requiring that the uploader keep their browser window open until the transfer completes."
  },
  {
    question: "can multiple people download my file at once?",
    answer: "absolutely! just share your unique bodega beam url with multiple recipients. each downloader establishes their own direct webrtc connection with your browser, enabling concurrent transfers without any bandwidth limitations from centralized servers."
  },
  {
    question: "how big can my files be?",
    answer: "file size is limited only by your browser's memory capacity and available system resources. bodega beam uses streaming protocols to handle large files efficiently, chunking data for optimal transfer performance across the peer-to-peer network."
  },
  {
    question: "what happens when i close my browser?",
    answer: "once you close your browser, your transfer urls become inactive and no new downloads can be initiated. however, if a downloader has already completed their transfer, they can continue seeding to other incomplete downloaders through webrtc's mesh networking capabilities."
  },
  {
    question: "are my files encrypted?",
    answer: "yes, all communications are automatically encrypted using dtls (datagram transport layer security) over webrtc, providing end-to-end encryption with public-key cryptography. additionally, you can set an optional password for an extra layer of aes-256 encryption on your file data."
  }
]

export default function FAQ(): React.ReactElement {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-medium text-white/80 text-center mb-8 drop-shadow-lg">
        frequently asked questions
      </h2>
      <Accordion className="w-full" type="single" collapsible>
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="mb-4">
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
} 