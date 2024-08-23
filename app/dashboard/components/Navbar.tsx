'use client';
import React, { useTransition } from 'react'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { CircleUser, LogOut, Menu, User} from 'lucide-react'

import { logout } from "@/app/auth/actions";

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ModeratorRecord } from '@/lib/types';

interface NavLinkProps {
    href: string;
    label: string;
    isActive: boolean;
}

const NavLink = ({ href, label, isActive }: NavLinkProps) => (
    <Link
        href={href}
        className={`w-fit transition-colors py-1 px-4 rounded-full ${
            isActive ? 'bg-primary shadow-md text-white' : 'text-foreground'
        } hover:text-primary`}
    >
        {label}
    </Link>
);

const Navbar = ({isAdmin,permission}:{isAdmin: boolean,permission:ModeratorRecord}) => {
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  const onSubmit = async () => {
  	startTransition(async () => {
  		await logout();
  	});
  };

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/moderators', label: 'Moderators', adminOnly: true },
    { href: '/dashboard/excos', label: 'Executives' },
  ];


  return (
    <>
        <header className="sticky top-0 flex items-center justify-between h-16 gap-4 px-4 border-b bg-background md:px-6">
            <Link
                href="#"
                className="items-center hidden gap-2 text-lg font-semibold  md:flex md:text-base"
            >
                    <Image src="/logo.png" width={40} height={40} alt="logo"/>
                    <span className="sr-only">PDP Excos</span>
            </Link>
            <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                {links.map((link) => {
                    if (link.adminOnly && !isAdmin) return null;

                    return (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            isActive={pathname === link.href}
                        />
                    );
                })}
            </nav>

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                    >
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">

                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Image src="/logo.png" width={50} height={50} alt="logo"/>
                            <span className="sr-only"></span>
                        </Link>
                        {links.map((link) => {
                            if (link.adminOnly && !isAdmin) return null;

                            return (
                                <NavLink
                                    key={link.href}
                                    href={link.href}
                                    label={link.label}
                                    isActive={pathname === link.href}
                                />
                            );
                        })}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
                <div className=""></div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="w-5 h-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <div className="px-4 py-2 ">
                            <h2 className="text-xs font-semibold text-gray-700 capitalize ">{isAdmin ? "Admin" : permission.moderators.state.toLowerCase()}{" "}{!isAdmin && "State"} Account </h2>
                            {
                                !isAdmin && (
                                    <p className="text-xs text-gray-400 capitalize ">{permission.moderators.name.toLowerCase()}</p>
                                )
                            }
                        </div> 
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/profile" className='flex gap-1.5 w-full'>
                                <User className="w-4 h-4 mr-2" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <form action={onSubmit}>
                            <button type="submit" className='w-full'>
                                <DropdownMenuItem>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span>Log out</span>
                                    <AiOutlineLoading3Quarters
                                        className={cn(" animate-spin", { hidden: !isPending })}
                                    />
                                </DropdownMenuItem>
                            </button>
                        </form>
                        
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    </>
  )
}


export default Navbar;