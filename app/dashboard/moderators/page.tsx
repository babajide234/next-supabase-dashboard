import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/user";
import ModeratorsTable from "./components/ModeratorsTable";
import CreateModerators from "./components/create/CreateModerators";
import SearchModerators from "./components/SearchModerators";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Moderators() {

	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "admin"
	return (
		<div className="w-full px-3 space-y-5 overflow-y-auto">
			<Card>
				<CardHeader className="gap-5 ">
					<CardTitle className="text-3xl ">Moderators</CardTitle>
					{
						isAdmin && 
						<div className="flex gap-2">
							<SearchModerators/>
							<CreateModerators/>
						</div>
					}
				</CardHeader>
				<CardContent>
					<ModeratorsTable/>
				</CardContent>
			</Card>
		</div>
	);
}
