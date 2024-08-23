'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import { changePassword } from "../../action";

// Define the validation schema
const FormSchema = z.object({
    previousPassword: z.string().min(6, "Password must be at least 8 characters long"),
    newPassword: z.string().min(6, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 8 characters long"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // set the path of the error to 'confirmPassword'
});

export default function PasswordForm(){
    const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			previousPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

    function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const result = await changePassword(data.previousPassword, data.newPassword);
    
            const { success, error, message } = result;
    
            if (!success && error) {
                toast({
                    title: "Error Changing Password",
                    description: error.message || "There was an error updating your password.",
                });
            } else {
                toast({
                    title: "Password Changed Successfully",
                    description: message || "Your password has been updated.",
                });
            }
        });
    }
    
    

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="grid gap-2">
                <FormField
                    control={form.control}
                    name="previousPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Previous Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid gap-2">
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid gap-2">
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
                <div className=""></div>
                <Button
                    type="submit"
                    className="flex items-center w-full gap-2"
                    variant="outline"
                >
                    Change Password{" "}
                    <AiOutlineLoading3Quarters
                        className={cn("animate-spin", { hidden: !isPending })}
                    />
                </Button>
            </div>
        </form>
    </Form>
    );
}

