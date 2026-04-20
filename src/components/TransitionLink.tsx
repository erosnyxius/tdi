"use client"

import React from "react"
import Link from "next/link"
import { useWebGLTransition } from "./WebGLTransitionProvider"

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({ href, children, className, ...props }) => {
  const { transitionTo } = useWebGLTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    transitionTo(href)
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
