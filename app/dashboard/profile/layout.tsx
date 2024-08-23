import { LockIcon, UserIcon } from "lucide-react";
import { ReactNode } from "react";
import { SideMenu } from "./components/SideMenu";

export default async function Layout({ children }: { children: ReactNode }) {

    const Nav = [
        { href: "/dashboard/profile", icon: <UserIcon className="w-6 h-6" />, label: "Profile Information", isActive: true },
        { href: "/dashboard/profile/security", icon: <LockIcon className="w-6 h-6" />, label: "Account Security" },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto grid md:grid-cols-[250px_1fr] items-start gap-6 px-6">
            <div className="space-y-1">
                <SideMenu Nav={Nav}/>
            </div>
            <div className="grid gap-4">
                {children}
            </div>
        </div>
    )
}