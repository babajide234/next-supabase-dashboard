import React from "react";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/Table";
import ListOfExcos from "./ListOfExcos";

export default function ExcosTable() {
	const tableHeader = [
		{
			header:"Full Name",
			classess:" w-fit"
		}, 
		{
			header:"Phone Number",
			classess:""
		}, 
		{
			header:"Gender",
			classess:""
		}, 
		{
			header:"Type",
			classess:""
		},  
		{
			header:"Position",
			classess:""
		},  
		{
			header:"State",
			classess:""
		}, 
		{
			header:"LGA",
			classess:""
		},  
		{
			header:"Ward",
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
			<ListOfExcos/>
		</TableBody>
	</Table>
	);
}
