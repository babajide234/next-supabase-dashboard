import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { readModerators } from "../actions";


export default async function ModeratorsTable() {
	const {data:permissions} = await readModerators()

	console.log(permissions)

	return (
		
		<>
			<DataTable columns={columns} data={permissions ?? []} />
		</>
	);
}
