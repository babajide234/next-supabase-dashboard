import React from "react";
import Table from "@/components/ui/Table";
import ListOfExcos from "./ListOfExcos";

export default function ExcosTable() {
	const tableHeader = ["Name", "Role", "Joined", "Status"];

	return (
		<Table headers={tableHeader}>
			<ListOfExcos />
		</Table>
	);
}
