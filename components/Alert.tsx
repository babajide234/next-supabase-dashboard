import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { ReactNode } from "react";

const Alert = ({
	Trigger,
	title,
	form,
	description,
}: {
	title: string;
	Trigger: ReactNode;
	description: string;
	form: ReactNode;
}) => {
    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>{Trigger}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
                {description}
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
                {form}
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

    );
}

export default Alert;