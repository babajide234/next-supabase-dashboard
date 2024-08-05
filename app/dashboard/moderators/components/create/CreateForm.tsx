"use client";

import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createModerators } from "../../actions";
import { startTransition, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { States } from "@/lib/data";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const FormSchema = z.object({
    name: z.string().min(3,{}),
    state: z.string(),
    email: z.string().email(),
    phone: z.string(),
})

export default function CreateForm (){

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			state: "",
			email: "",
			phone: "",
		},
	});


    function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition( async () =>{
			const result = await createModerators(data);
			
			const parsedResult = JSON.parse(result);

			
			const error = parsedResult.error;

			if(error?.message){
				toast({
					title: "Failed to create Member",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">
								{error?.message}
							</code>
						</pre>
					),
				});
			}else{
				document.getElementById("create-trigger")?.click();

				toast({
					title: "Successfully Created Member",
				});
			}
		})


		
	}

    return (
        <Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full h-full space-y-6"
			>
                <FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter Full Name"
									type="text"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
                <FormField
					control={form.control}
					name="state"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Moderator State</FormLabel>
							<FormControl >
                                
                                <Select
                                    onValueChange={field.onChange}
								    defaultValue={field.value}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select State" />
                                    </SelectTrigger>
                                    <SelectContent className="overflow-y-auto max-h-[10rem]">
                                        {
                                            States.map((item,index)=>(
                                                <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
                <FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="email@gmail.com"
									type="email"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
                <FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input
									placeholder="08000000000"
									type="text"
									{...field}
									onChange={field.onChange}
								/>
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
					Submit{" "}
					<AiOutlineLoading3Quarters
						className={cn("animate-spin", { hidden: !isPending })}
					/>
				</Button>
            </form>
        </Form>
    );
}