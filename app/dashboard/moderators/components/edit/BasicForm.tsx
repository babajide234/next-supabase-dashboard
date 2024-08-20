"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransition } from "react";
import { updateStatus } from "../../actions";

const FormSchema = z.object({
	status: z.enum(["active", "inactive"]),
});

export default function BasicForm({ id, status }: { id: string; status: "active"|"inactive"; })  {

	const [isPending, startTransition] = useTransition();

	console.log({id,status});
	
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
		  status: status ,
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition( async () =>{
			const result = await updateStatus(id, data.status);
			
			const parsedResult = JSON.parse(result);
			const error = parsedResult.error;

			if(error?.message){
				toast({
					title: "Failed to Update Moderator Status",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">
								{error?.message}
							</code>
						</pre>
					),
				});
			}else{
				document.getElementById("update-trigger")?.click();

				toast({
					title: "Successfully Updated Moderator Status",
					description:(
						<pre>
							<code>
								{parsedResult.data}
							</code>
						</pre>
					)
				});
			}
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Change Status</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => field.onChange(value)}
									value={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="inactive">Inactive</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="flex items-center w-full gap-2"
					variant="outline"
				>
					Update{" "}
					<AiOutlineLoading3Quarters
						className={cn(" animate-spin", {hidden: !isPending,})}
					/>
				</Button>
			</form>
		</Form>
	);
}
