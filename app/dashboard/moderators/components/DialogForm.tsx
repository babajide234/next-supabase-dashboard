import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import React, { ReactNode } from "react";

export default function DailogForm({
	Trigger,
	id,
	title,
	form,
}: {
	title: string;
	Trigger: ReactNode;
	id: string;
	form: ReactNode;
}) {
	return (
		
		<Sheet>
		<SheetTrigger asChild id={id}>
			{Trigger}
		</SheetTrigger>
		<SheetContent  className={" w-[400px] sm:w-[540px] lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
		  <SheetHeader>
			<SheetTitle>{title}</SheetTitle>
			<SheetDescription>
			Make changes to the profile. Click save when
			</SheetDescription>
		  </SheetHeader>
		  {form}
		</SheetContent>
	  </Sheet>
	  
	);
}
