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
		// <Dialog>
		// 	<DialogTrigger asChild id={id}>
		// 		{Trigger}
		// 	</DialogTrigger>
		// 	<DialogContent className="sm:max-w-[525px] dark:bg-graident-dark">
		// 		<DialogHeader>
		// 			<DialogTitle>{title}</DialogTitle>
		// 			<DialogDescription>
		// 				Make changes to your profile here. Click save when
		// 			</DialogDescription>
		// 		</DialogHeader>
		// 		{form}
		// 	</DialogContent>
		// </Dialog>
		<Sheet>
		<SheetTrigger asChild id={id}>
			{Trigger}
		</SheetTrigger>
		<SheetContent  className={" w-[400px] sm:w-[540px] lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
		  <SheetHeader>
			<SheetTitle>{title}</SheetTitle>
			<SheetDescription>
			Make changes to your profile here. Click save when
			</SheetDescription>
		  </SheetHeader>
		  {form}
		</SheetContent>
	  </Sheet>
	  
	);
}
