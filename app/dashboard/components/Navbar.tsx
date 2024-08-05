'use client';
import React, { useTransition } from 'react'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { CircleUser, Menu, Package2, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { logout } from "@/app/auth/actions";

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useUserStore } from '@/lib/store/user'
import Link from 'next/link'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import SignOut from './SignOut';


const Navbar = ({isAdmin}:{isAdmin: boolean}) => {
  const [isPending, startTransition] = useTransition();
  const onSubmit = async () => {
  	startTransition(async () => {
  		await logout();
  	});
  };



  return (
    <>
        <header className="sticky top-0 flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6">
            <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2/>
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                    href={'/dashboard'}
                    className="transition-colors text-foreground hover:text-foreground"
                >
                    Dashboard
                </Link>

                {
                    isAdmin &&
                    <Link
                        href={'/dashboard/moderators'}
                        className="transition-colors text-foreground hover:text-foreground"
                    >
                        Moderators
                    </Link>
                }
                <Link
                    href={'/dashboard/excos'}
                    className="transition-colors text-foreground hover:text-foreground w-fit"
                >
                    Executives
                </Link>

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
                    <Package2 className="w-6 h-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                {/* {
                    menu.map((item,i)=>(
                    <Link
                        key={i}
                        href={item.path}
                        className="hover:text-foreground"
                    >
                        {item.name}
                    </Link>
                
                    ))
                } */}
                
                </nav>
            </SheetContent>
            </Sheet>
            <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="flex-1 ml-auto sm:flex-initial">
                <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
                </div>
            </form>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="w-5 h-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <form action={onSubmit}>
                            <Button
                                className="flex items-center w-full gap-2"
                                variant="outline"
                            >
                                SignOut{" "}
                                <AiOutlineLoading3Quarters
                                    className={cn(" animate-spin", { hidden: !isPending })}
                                />
                            </Button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </header>
    </>
  )
}


export default Navbar;