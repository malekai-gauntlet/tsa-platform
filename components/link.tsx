import NextLink from 'next/link'
import { forwardRef } from 'react'

interface LinkProps extends React.ComponentPropsWithoutRef<typeof NextLink> {
  children: React.ReactNode
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <NextLink ref={ref} {...props}>
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link' 