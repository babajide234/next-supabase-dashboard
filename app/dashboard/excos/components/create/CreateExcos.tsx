import { Button } from "@/components/ui/button";
import React from "react";
import DailogForm from "../DialogForm";
import CreateForm from "./CreateForm";

export default function CreateExcos() {
	return (
		<DailogForm
			id="create-trigger"
			title="Create Excos"
			Trigger={<Button variant="outline">Create+</Button>}
			form={<CreateForm />}
		/>
	);
}
