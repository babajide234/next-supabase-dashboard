'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editprofile } from "../../action";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/lib/store/user";
import { usePermissionsStore } from "@/lib/store/permissions";

const FormSchema = z.object({
    name: z.string(),
    email: z.optional(z.string().email()) 
})

const ProfileInfoForm = () => {

    const [isPending, startTransition] = useTransition();

    const user = useUserStore.getState().user;
    const permission = usePermissionsStore.getState().permissions;



	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
		  name:  "" ,
		  email: "" ,
		},
	});

    useEffect(() => {
        if (user && permission) {
            form.reset({
                name: permission?.moderators?.name || "",
                email: user?.email || "",
            });
        }
    }, [user, permission, form]);

    function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition( async () =>{
			const result = await editprofile(data);
			
			const { success, error, message } = result;

			if (!success && error) {
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
								{message}
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
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        disabled={true}
                    />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                    <Button variant="outline" className="w-full">
                        Cancel
                    </Button>
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
                </div>
            </form>
        </Form>
    );
}

export default ProfileInfoForm;