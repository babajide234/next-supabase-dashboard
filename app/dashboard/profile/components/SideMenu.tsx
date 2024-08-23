'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
}

interface SideMenuProps {
    Nav: NavItem[];
}
export function SideMenu({ Nav }:SideMenuProps){
    const pathname = usePathname();
    return(
        <>
            {
                Nav.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    className={cn(
                        "flex items-center space-x-2 py-2 rounded-md text-sm font-medium",
                        pathname === link.href  ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
                    )}
                    prefetch={false}
                >
                    {link.icon}
                    <span>{link.label}</span>
                </Link>
            ))}
        </>
    )
}