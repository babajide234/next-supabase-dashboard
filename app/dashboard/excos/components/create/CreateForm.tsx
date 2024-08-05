"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CongressType, Positions, States } from "@/lib/data";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createExecutiveEntry} from "../../actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import {  useState, useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePermissionsStore } from "@/lib/store/permissions";

const FormSchema = z
	.object({
		name: z.string().min(2),
		gender: z.string(),
		phone: z.string(),
		lga: z.string(),
		ward: z.string(),
		type: z.string(),
		position: z.string(),
	})

export default function MemberForm({permissions}:{permissions: any}) {

	const [isPending, startTransition] = useTransition();
	const [wards, setWards] = useState<any[]>([]);
	const [pos, setPositions] = useState<any[]>([]);

	const state = States.find(state => state.name === permissions?.moderators.state);
	const LGAs = state ? state.lgas : [];

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			gender: "",
			phone: "",
			lga: "",
			ward: "",
			type: "",
			position: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition( async () =>{
			// Retrieve state from the store
			const state = permissions?.moderators.state;
			

			if (!state) {
				toast({
					title: "Failed to create Member",
					description: "State information is missing.",
				});
				return;
			}

			// Add state to the data
			const result = await createExecutiveEntry({
				...data,
				state,  // Add state to the data
			});
			
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
	
	function handleLGAChange(value: string) {
		const selectedLGA = LGAs.find(lga => lga.name === value);
		setWards(selectedLGA ? selectedLGA.wards : []);
		form.setValue("lga", value);
		form.setValue("ward", ""); // Reset ward selection
	}

	function handleTypeChange(value: string) {
		const selectedPositions = Positions.filter(position => position.Level === value);
		
		setPositions(selectedPositions ? selectedPositions : []);
		form.setValue("type", value);
		form.setValue("position", ""); // Reset position selection
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
									placeholder="full name"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="gender"
					render={({ field }) => (
						<FormItem>
						<FormLabel>Gender</FormLabel>
						<FormControl>
							<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex flex-col space-y-1"
							>
							<FormItem className="flex items-center space-x-3 space-y-0">
								<FormControl>
								<RadioGroupItem value="male" />
								</FormControl>
								<FormLabel className="font-normal">Male</FormLabel>
							</FormItem>
							<FormItem className="flex items-center space-x-3 space-y-0">
								<FormControl>
								<RadioGroupItem value="female" />
								</FormControl>
								<FormLabel className="font-normal">Female</FormLabel>
							</FormItem>
							</RadioGroup>
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
												placeholder="phone number"
												onChange={field.onChange}
												value={field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lga"
					render={({ field }) => (
						<FormItem>
							<FormLabel>LGA</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => {
										handleLGAChange(value);
										field.onChange(value);
									}}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="overflow-y-auto max-h-[10rem]">
										{LGAs.map((type, index) => (
											<SelectItem
												value={type.name}
												key={index}
											>
												{type.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ward"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ward</FormLabel>
							<FormControl>
							<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Ward" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="overflow-y-auto max-h-[10rem]">
										{wards.map((ward, index) => (
											<SelectItem
												value={ward.name}
												key={index}
											>
												{ward.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
							<Select
								onValueChange={(value) => {
									handleTypeChange(value);
									field.onChange(value);
								}}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="overflow-y-auto max-h-[10rem]">
									{CongressType.map((type, index) => (
										<SelectItem
											value={type.Level}
											key={index}
										>
											{type.Level}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="position"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Position</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select position" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="overflow-y-auto max-h-[10rem]">
									{pos.map((position, index) => (
										<SelectItem
											value={position.Position}
											key={index}
										>
											{position.Position}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
