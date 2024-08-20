import React from "react";
import DailogForm from "../DialogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import EditForm from "./EditorForm";

export default function EditModerator({ id, status, isAdmin }: { id: string; status: string; isAdmin: boolean }) {
	return (
		<DailogForm
			id="update-trigger"
			title="Edit Moderator"
			Trigger={
				<Button className="justify-start gap-2 px-2.5 h-8" variant="ghost" size='full'>
					<Pencil1Icon />
					Edit
				</Button>
			}
			form={<EditForm id={id} status={status} isAdmin={isAdmin} />}
		/>
	);
}
