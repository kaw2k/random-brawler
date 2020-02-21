import * as React from 'react'
import NextLink, { LinkProps } from 'next/link'

export const Link: React.SFC<{
  external?: boolean
  className?: string
  href: string
  as?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<any>) => void
}> = ({ external, href, children, as, ...props }) => {
  if (external) {
    return (
      <a {...props} href={href}>
        {children}
      </a>
    )
  } else {
    return (
      <NextLink href={href} as={as}>
        <a {...props}>{children}</a>
      </NextLink>
    )
  }
}
