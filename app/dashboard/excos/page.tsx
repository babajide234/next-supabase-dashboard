import React from "react";
import MemberTable from "./components/ExcosTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchMembers from "./components/SearchExcos";
import CreateMember from "./components/create/CreateExcos";
import { useUserStore } from "@/lib/store/user";
import CreateExcos from "./components/create/CreateExcos";
import SearchExcos from "./components/SearchExcos";
import ExcosTable from "./components/ExcosTable";

export default function Excos() {

	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "admin"
	return (
		<div className="w-full px-3 space-y-5 overflow-y-auto">
			<h1 className="text-3xl font-bold">Excos</h1>
			{
				isAdmin &&
				<div className="flex gap-2">
					<SearchExcos />
					<CreateExcos />
				</div>
			}
			<ExcosTable />
		</div>
	);
}
