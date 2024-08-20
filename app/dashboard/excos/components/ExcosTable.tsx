import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./colums";
import { useUserStore } from "@/lib/store/user";
import { readExcos } from "../actions";

export default async function ExcosTable() {
	
	const {data} = await readExcos()

	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "admin"
	console.log(data)
	
	return (
		<>
			<DataTable columns={columns} data={data ?? []}/>
		</>
	);
}
