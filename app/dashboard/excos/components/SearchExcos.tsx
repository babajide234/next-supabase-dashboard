import { Input } from "@/components/ui/input";
import React from "react";

export default function SearchExcos() {
	return (
		<Input
			placeholder="search by role, name"
			className="bg-white  ring-zinc-300 dark:bg-inherit focus:dark:ring-zinc-700 focus:ring-zinc-300"
		/>
	);
}
