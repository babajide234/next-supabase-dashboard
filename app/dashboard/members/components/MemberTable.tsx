import { Button } from "@/components/ui/button";
import React from "react";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
import ListOfMembers from "./ListOfMembers";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

export default function MemberTable() {
	const tableHeader = [
		{
			header:"Name",
			classess:""
		}, 
		{
			header:"Role",
			classess:""
		}, 
		{
			header:"Joined",
			classess:""
		},  
		{
			header:"Status",
			classess:""
		},  
	];

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{tableHeader.map((header,index)=>(
						<TableHead key={index} className={header.classess}>{header.header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				<ListOfMembers />
  			</TableBody>
		</Table>
	);
}
