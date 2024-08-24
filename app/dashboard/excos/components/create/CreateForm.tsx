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
import { useEffect, useState, useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";


const FormSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name must be less than 50 characters long." }),
    gender: z.enum(["male", "female"], {
        message: "Gender must be either 'male' or 'female'."
    }),
    phone: z.string()
        .length(11, { message: "Phone number must be exactly 11 digits long." })
        .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
    type: z.enum(["ward", "lga","state"], {
        message: "Type must be either 'ward' or 'lga'."
    }),
    lga: z.string().optional(), 
    ward: z.string().optional(),
	state: z.string().optional(),
    position: z.string().min(1, { message: "Position is required." })
})
.refine((data) => {
    if (data.type === "ward") {
        return data.lga && data.ward; // Both lga and ward must be filled
    }
    if (data.type === "lga") {
        return data.lga; // Only lga is required
    }
    if (data.type === "state") {
        return true;
    }
    return true;
}, {
    message: "LGA and Ward are required if type is 'ward'. LGA is required if type is 'lga'.",
    path: ["type"], // Error path in case of failure
});


type PositionLevel = "ward" | "lga" | "state";



export default function MemberForm({isAdmin,permissions}:{isAdmin:boolean, permissions: any}) {

	const [isPending, startTransition] = useTransition();
	const [wards, setWards] = useState<any[]>([]);
	const [pos, setPositions] = useState<any[]>([]);
	const [LGAs, setLGAs] = useState<any[]>([]); // Add state for LGAs

	const state = States.find(
		(state) => state.name === permissions?.moderators.state
	);

	const router = useRouter()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			gender: undefined,
			phone: "",
			lga: "",
			ward: "",
			state: isAdmin ? "" : permissions?.moderators.state, 
			type: undefined,
			position: "",
		},
	});

    // Use effect to populate LGAs when component loads
    useEffect(() => {
        if (!isAdmin && permissions?.moderators.state) {
            const selectedState = States.find((state) => state.name === permissions.moderators.state);
            const newLGAs = selectedState ? selectedState.lgas : [];
            setLGAs(newLGAs); // Update LGAs based on the state from permissions
        }
    }, [isAdmin, permissions]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition( async () =>{
			// Retrieve state from the store
			const state = isAdmin ? data.state : permissions?.moderators.state;
			

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
				state,
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
				router.refresh()

			}
		})


		
	}
	
	// Handle state change for admins
	function handleStateChange(value: string) {
		const selectedState = States.find((state) => state.name === value);
		const newLGAs = selectedState ? selectedState.lgas : [];
		setLGAs(newLGAs); // Update LGAs based on the selected state
		setWards([]); // Clear wards when state changes
		form.setValue("state", value); // Set state value in the form
		form.setValue("lga", ""); // Reset LGA
		form.setValue("ward", ""); // Reset Ward
	}
	
	// Handle LGA change
	function handleLGAChange(value: string) {
		const selectedLGA = LGAs.find((lga) => lga.name === value);
		setWards(selectedLGA ? selectedLGA.wards : []);
		form.setValue("lga", value);
		form.setValue("ward", ""); // Reset ward selection
	}

	function handleTypeChange(value: PositionLevel) {
		const selectedPositions = Positions.filter(position => 
			position.Level.toLowerCase() === value.toLowerCase()
		  );
			  
		setPositions(selectedPositions ? selectedPositions : []);
		form.setValue("type", value);
		form.setValue("position", "");
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

				{isAdmin && (
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Select State</FormLabel>
								<Select
									onValueChange={(value) => {
										handleStateChange(value); // Update state and LGAs
										field.onChange(value);
									}}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select State" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="overflow-y-auto max-h-[10rem]">
										{States.map((state, index) => (
											<SelectItem value={state.name} key={index}>
												{state.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
						<FormLabel>Type</FormLabel>
						<Select
							onValueChange={(value: PositionLevel) => {
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
									<SelectItem value={type.Level as PositionLevel} key={index}>
										{type.Level}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FormMessage />
						</FormItem>
					)}
				/>



				{form.watch("type") === "lga" || form.watch("type") === "ward" ? (
					<FormField
						control={form.control}
						name="lga"
						render={({ field }) => (
						<FormItem>
							<FormLabel>LGA</FormLabel>
							<Select
							onValueChange={(value) => {
								handleLGAChange(value);
								field.onChange(value);
							}}
							defaultValue={field.value}
							>
							<FormControl>
								<SelectTrigger>
								<SelectValue placeholder="Select LGA" />
								</SelectTrigger>
							</FormControl>
							<SelectContent className="overflow-y-auto max-h-[10rem]">
								{LGAs.map((lga, index) => (
								<SelectItem value={lga.name} key={index}>
									{lga.name}
								</SelectItem>
								))}
							</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
						)}
					/>
				) : null}

				{form.watch("type") === "ward" ? (
					<FormField
						control={form.control}
						name="ward"
						render={({ field }) => (
						<FormItem>
							<FormLabel>Ward</FormLabel>
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
									<SelectItem value={ward.name} key={index}>
										{ward.name}
									</SelectItem>
								))}
							</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
						)}
					/>
				) : null}

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
