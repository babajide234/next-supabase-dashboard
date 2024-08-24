import React from "react";
import { useUserStore } from "@/lib/store/user";
import CreateExcos from "./components/create/CreateExcos";
import SearchExcos from "./components/SearchExcos";
import ExcosTable from "./components/ExcosTable";
import { usePermissionsStore } from "@/lib/store/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function Excos() {


	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "moderator" || user?.user_metadata.role === "admin"
	const permissions = usePermissionsStore.getState().permissions;
	
	return (
		<Card>
			<CardHeader className="gap-5 ">
				<CardTitle className="text-3xl ">Executives</CardTitle>
				{
					permissions && isAdmin && (
						<div className="flex gap-2">
							<SearchExcos />
							<CreateExcos isAdmin={isAdmin} permissions={permissions}/>
						</div>
					)
				}
			</CardHeader>
			<CardContent>
				<ExcosTable/>
			</CardContent>
		</Card>
	);
}
