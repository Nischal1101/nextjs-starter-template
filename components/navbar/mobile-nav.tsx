'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Text } from '@/components/ui/text'
import { siteConfig } from '@/lib/site-config'
import { ArrowUpRightIcon, HamburgerIcon, XIcon } from 'lucide-react'

import { navLinks } from '.'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (open) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="dark:bg-muted size-14 rounded-full p-0"
        >
          <HamburgerIcon className="size-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="bg-background text-muted-foreground flex h-[90vh] flex-col justify-between"
        hasCloseButton={false}
        tabIndex={-1}
      >
        <div className="container mt-4 flex h-20 rounded-full bg-black/80 backdrop-blur-sm dark:bg-white/80">
          <div className="flex flex-1 items-center justify-between">
            {/* <Link href="/">
              <Logo className="xsm:block hidden" />
              <LogoSmall className="xsm:hidden block" />
            </Link> */}

            <Button
              variant="secondary"
              size="icon"
              className="size-14 rounded-full p-0"
              onClick={() => setOpen(false)}
            >
              <XIcon className="size-6" />
              <span className="sr-only">close menu</span>
            </Button>
          </div>
        </div>
        <div className="container mt-16 flex flex-col">
          <nav className="flex flex-col items-start space-y-4">
            {navLinks?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-background/80 text-muted-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                <Text variant="body-2">{link.label}</Text>
              </Link>
            ))}
          </nav>

          <div className="text-muted-foreground mt-auto flex flex-col space-y-4 pt-16">
            <Text variant="body-2">{siteConfig.address}</Text>

            <Link
              href={`mailto:${siteConfig.contacts.email}`}
              className="hover:text-background/80 flex items-center gap-2 transition-colors"
            >
              <Text variant="body-2">{siteConfig.contacts.email}</Text>
              <ArrowUpRightIcon className="size-4" />
            </Link>

            <div className="flex gap-6">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background/80 flex items-center gap-2 transition-colors"
              >
                <Text variant="body-2">LinkedIn</Text>
                <ArrowUpRightIcon className="size-4" />
              </Link>

              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background/80 flex items-center gap-2 transition-colors"
              >
                <Text variant="body-2">WhatsApp</Text>
                <ArrowUpRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-auto mb-4 w-full overflow-hidden md:w-auto lg:hidden">
          {/* <FooterLargeLogo className="h-[106px] w-full max-w-[700px] md:max-w-none" /> */}
        </div>
      </SheetContent>
    </Sheet>
  )
}