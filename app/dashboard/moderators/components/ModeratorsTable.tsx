import React from "react";
import ListOfModerators from "./ListOfModerators";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Card } from "@/components/ui/card";

export default function ModeratorsTable() {
	const tableHeader = [
		{
			header:"Name",
			classess:" w-fit"
		}, 
		{
			header:"State",
			classess:""
		}, 
		{
			header:"Created On",
			classess:""
		},  
		{
			header:"Status",
			classess:""
		},  
		{
			header:"",
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
				<ListOfModerators />
  			</TableBody>
		</Table>
	);
}
