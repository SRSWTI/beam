'use client'

import React, { JSX } from 'react'
import { MailIcon } from 'lucide-react'

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}): JSX.Element {
  return (
    <a
      href={href}
      className="text-white/80 hover:text-white transition-colors duration-200 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export function Footer(): JSX.Element {
  return (
    <>
      <div className="h-[100px]" />
      <footer className="fixed bottom-0 left-0 right-0 p-3 text-xs  ">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8">
     
          <div className="flex items-center gap-3 ml-auto">
            <FooterLink href="mailto:bodega@srswti.com">
              <MailIcon className="w-5 h-5" />
            </FooterLink>
            <FooterLink href="https://x.com/srswti_ai">
              <img
                src="https://api.srswti.com/storage/v1/object/public/bodega-public/apps/twitter.png"
                alt="Twitter"
                className="w-6 h-6"
              />
            </FooterLink>
            <FooterLink href="https://github.com/srswti">
              <img
                src="https://api.srswti.com/storage/v1/object/public/bodega-public/apps/github.webp"
                alt="GitHub"
                className="w-6 h-6"
              />
            </FooterLink>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
