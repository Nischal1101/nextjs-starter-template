'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoaderCircle, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Text } from '../ui/text'
import MobileNav from './mobile-nav'
import { useClientReady } from '@/hooks/use-client-ready'
import UserDropdown from './user-dropdown'

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#products', label: 'Products' },
  { href: '/chart?symbol=NEPSE', label: 'Charts' },
  // { href: '/dashboard/research', label: 'Reports And Analysis' },
  { href: '/news', label: 'News' },
  { href: '/blog', label: 'Blogs' },
  { href: '/about', label: 'About Us' },
]

export default function Navbar() {
//   const { data: session, isLoading } = useSession()
const isLoading=false;
const session=null
  const mounted = useClientReady()

  const isAuthenticated = !!session
  const showSessionUI = mounted && !isLoading
  const { theme, setTheme } = useTheme()

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex w-screen flex-col overflow-hidden border">
        <nav className="dark:bg-background/80 h-[var(--header-height)] border bg-white/80 backdrop-blur-sm">
          <div className="container flex h-full w-full items-center gap-2">
            <div className="flex flex-1 items-center justify-between">
              {/* <Link href="/" className="dark:hidden">
                <Logo className="xsm:block hidden size-40" />
                <LogoSmall className="xsm:hidden block size-8" />
              </Link>
              <Link href="/" className="hidden dark:block">
                <LogoDark className="xsm:block hidden size-40" />
                <LogoSmall className="xsm:hidden block size-8" />
              </Link> */}
              <nav className="hidden items-center gap-8 lg:flex">
                <NavLinks />
              </nav>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:hidden dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <div className="hidden lg:block">
                  {!showSessionUI ? (
                    <Button
                      variant={'ghost'}
                      className="border-primary w-[127px] rounded-4xl border p-6"
                    >
                      <LoaderCircle className="size-4 animate-spin" />
                    </Button>
                  ) : isAuthenticated ? (
                    <UserDropdown user={session} />
                  ) : (
                    <Button
                      asChild
                      variant={'ghost'}
                      className="border-primary rounded-4xl border p-6"
                    >
                      <Link
                        href={
                          mounted && isAuthenticated ? '/dashboard' : '/login'
                        }
                      >
                        {mounted && isAuthenticated
                          ? 'Dashboard'
                          : 'Get Started'}
                      </Link>
                    </Button>
                  )}
                </div>
                <div className="lg:hidden">
                  <MobileNav />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export function NavLinks({ className = '', onClick = () => {} }) {
  const [hashFragment, setHashFragment] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const handleHashChange = () =>
      setHashFragment(window.location.hash.slice(1))

    const { pushState, replaceState } = window.history
    window.history.pushState = function (...args) {
      pushState.apply(window.history, args)
      setTimeout(() => setHashFragment(window.location.hash.slice(1)))
    }
    window.history.replaceState = function (...args) {
      replaceState.apply(window.history, args)
      setTimeout(() => setHashFragment(window.location.hash.slice(1)))
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      {navLinks.map((link) => {
        const isActive =
          (link.href === '/' && pathname === '/' && !hashFragment) ||
          (link.href !== '/' &&
            (pathname === link.href ||
              (link.href.includes('#') &&
                hashFragment === link.href.split('#')[1])))

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'group relative flex items-start justify-center',
              className,
            )}
            onClick={onClick}
          >
            <div
              className={cn(
                'text-green-700',
                'opacity-0 transition-all duration-200',
                isActive && 'opacity-100',
              )}
            >
              [&nbsp;
            </div>
            <Text
              variant="body-4"
              className={cn(
                'group-hover:text-primary text-muted-foreground dark:text-foreground',
                isActive && 'font-medium text-green-700 dark:text-green-700',
                'text-[15px] lg:text-[16px]',
              )}
            >
              {link.label}
            </Text>

            <div
              className={cn(
                'text-green-700',
                'opacity-0 transition-all duration-200',
                isActive && 'opacity-100',
              )}
            >
              &nbsp;]
            </div>
          </Link>
        )
      })}
    </>
  )
}