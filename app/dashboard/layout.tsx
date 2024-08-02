import React, { ReactNode } from "react";
import SideNav from "./components/SideNav";
import ToggleSidebar from "./components/ToggleSidebar";
import MobileSideNav from "./components/MobileSideNav";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useUserStore } from "@/lib/store/user";
import Navbar from "./components/Navbar";

export default async function Layout({ children }: { children: ReactNode }) {
	const { data: userSession } = await readUserSession();

	if (!userSession.session) {
		return redirect("/auth");
	}


	useUserStore.setState({user: userSession.session.user })

	return (

		<div className="flex flex-col w-full min-h-screen">
			<Navbar/>
			<main className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8">
				{children}
			</main>
		</div>
	);
}
