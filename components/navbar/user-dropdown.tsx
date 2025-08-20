import React from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { truncate } from '@/lib/utils'
import {
  ChevronDown,
  CreditCard,
  FileText,
  Globe,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react'

import { Text } from '../ui/text'

const menuItems = [
  {
    icon: User,
    label: 'View Profile',
    path: '/profile',
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/settings',
  },
  {
    icon: CreditCard,
    label: 'Subscription',
    path: '/subscription',
    separator: true,
  },
  {
    icon: FileText,
    label: 'Changelog',
    path: '/changelog',
  },
  {
    icon: Users,
    label: 'Team',
    path: '/team',
  },
  {
    icon: UserPlus,
    label: 'Invite Member',
    path: '/invite',
    separator: true,
  },
  {
    icon: LifeBuoy,
    label: 'Support',
    path: '/support',
  },
  {
    icon: Globe,
    label: 'Community',
    path: '/community',
    separator: true,
  },
]

export default function UserDropdown({ user }: { user:{full_name:string,email:string} }) {
  const router = useRouter()
//   const { logout } = useSession()

//   function handleLogout() {
//     logout()
//   }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative rounded-4xl !p-6 !px-6">
          {truncate(user?.full_name?.split(' ')[0], 20)}

          <ChevronDown className="text-muted-foreground ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-xl p-2 shadow-lg"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="hover:bg-black-50/10 rounded-lg px-3 py-2">
          <div className="flex flex-col space-y-2">
            <p className="text-base leading-none font-medium">
              {user?.full_name}
            </p>
            <p className="text-muted-foreground truncate text-sm leading-none">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />

        {menuItems.map((item) => (
          <div key={item.path}>
            <DropdownMenuItem
              onClick={() => router.push(item.path)}
              className="hover:!bg-accent group flex h-9 cursor-pointer items-center rounded-lg p-3 transition-all"
            >
              <item.icon className="group-hover:text-primary text-black-300 mr-3 size-4" />
              <Text
                variant="body-4"
                className="text-foreground group-hover:text-primary"
              >
                {item.label}
              </Text>
            </DropdownMenuItem>
            {item.separator && <DropdownMenuSeparator className="my-1.5" />}
          </div>
        ))}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-destructive hover:!bg-destructive/20 hover:text-destructive flex h-9 cursor-pointer items-center rounded-lg p-3 transition-all"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <Text variant="body-4" className="text-foreground">
                Sign Out
              </Text>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to sign out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will be logged out of your account and redirected to the
                login page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                // onClick={handleLogout}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Sign Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}