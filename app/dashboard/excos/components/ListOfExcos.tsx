import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditMember from "./edit/EditMember";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/lib/store/user";
import { readExcos } from "../actions";
import { IPermission } from "@/lib/types";
import { TableCell, TableRow } from "@/components/ui/Table";

 
export default async function ListOfExcos() {
	const {data} = await readExcos()

	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "admin"

	return (
		<>
			{data?.map((exco, index) => {
				return (
					<TableRow key={exco.id}>
						<TableCell className="font-medium">{exco.name}</TableCell>
						<TableCell>{exco.phone}</TableCell>
						<TableCell>{exco.gender}</TableCell>
						<TableCell>{exco.type}</TableCell>
						<TableCell>{exco.position}</TableCell>
						<TableCell>{exco.state}</TableCell>
						<TableCell>{exco.lga}</TableCell>
						<TableCell>{exco.ward}</TableCell>
					</TableRow>
				);
			})}
		</>
	);
}
