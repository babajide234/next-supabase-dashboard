import React from "react";
import ListOfModerators from "./ListOfModerators";
import Table from "@/components/ui/Table";

export default function ModeratorsTable() {
	const tableHeader = ["Full Name","Email","State","phone"];

	return (
		<Table headers={tableHeader}>
			<ListOfModerators />
		</Table>
	);
}
