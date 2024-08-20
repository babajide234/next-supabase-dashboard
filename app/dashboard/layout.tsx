import React, { ReactNode } from "react";
import { readPermissions, readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useUserStore } from "@/lib/store/user";
import Navbar from "./components/Navbar";
import { usePermissionsStore } from "@/lib/store/permissions";

export default async function Layout({ children }: { children: ReactNode }) {
	const { data: userSession } = await readUserSession();
	const permission = await readPermissions();
	
	if (!userSession.session) {
		return redirect("/auth");
	}
	
	const isAdmin = userSession.session.user?.user_metadata.role === "admin"

	useUserStore.setState({user: userSession.session.user })
	usePermissionsStore.setState({ permissions: permission[0]})
	
	return (

		<div className="flex flex-col w-full min-h-screen">
			<Navbar isAdmin={isAdmin} permission={permission[0]}/>
			<main className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8">
				{children}
			</main>
		</div>
	);
}
