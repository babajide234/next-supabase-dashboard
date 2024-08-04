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
import { usePermissionsStore } from "@/lib/store/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Excos() {

	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "moderator"
	const permissions = usePermissionsStore.getState().permissions;

	console.log("permissions exco",permissions)
	// console.log(user)
	return (
		<Card>
			<CardHeader className="gap-5 ">
				<CardTitle className="text-3xl ">PDP Executives</CardTitle>
				{
					isAdmin &&
					<div className="flex gap-2">
						<SearchExcos />
						<CreateExcos permissions={permissions}/>
					</div>
				}
			</CardHeader>
			<CardContent>
				<ExcosTable/>
			</CardContent>
		</Card>
	);
}
