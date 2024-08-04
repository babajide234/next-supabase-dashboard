import { Button } from "@/components/ui/button";
import React from "react";
import DailogForm from "../DialogForm";
import CreateForm from "./CreateForm";

export default function CreateExcos({permissions}:{permissions: any}) {
	return (
		<DailogForm
			id="create-trigger"
			title="Create Executives"
			Trigger={<Button variant="outline">Add New Executive</Button>}
			form={<CreateForm permissions={permissions} />}
		/>
	);
}
